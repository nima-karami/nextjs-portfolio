'use client';

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { captureEvent } from '../util/analytics';
import { playTone } from './audio';
import {
  type ShellControls,
  type SoundName,
  type Stage,
  THEMES,
  type ThemeName,
} from './types';

const ShellContext = createContext<ShellControls | null>(null);

export function useShell(): ShellControls {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error('useShell must be used within <ShellProvider>');
  return ctx;
}

export function ShellProvider({ children }: { children: ReactNode }) {
  const [stage, setStageState] = useState<Stage>({
    kind: 'scene',
    scene: 'portrait',
  });
  const [theme, setThemeState] = useState<ThemeName>('dark');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Apply theme via a data attribute; globals.css overrides the --color-term-*
  // tokens per theme so every utility updates.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // A user-chosen scene is an `appearance` event; the implicit reset-to-portrait
  // on game exit is NOT (it isn't a customization choice) — so resetStage writes
  // state directly, bypassing the instrumented setter.
  const setStage = useCallback((s: Stage) => {
    setStageState(s);
    if (s.kind === 'scene') {
      captureEvent('appearance', {
        kind: 'scene',
        value: s.scene,
        via: 'command',
      });
    }
  }, []);

  const resetStage = useCallback(
    () => setStageState({ kind: 'scene', scene: 'portrait' }),
    []
  );

  const cycleTheme = useCallback(() => {
    let next: ThemeName = 'dark';
    setThemeState((cur) => {
      const i = THEMES.indexOf(cur);
      next = THEMES[(i + 1) % THEMES.length];
      return next;
    });
    captureEvent('appearance', { kind: 'theme', value: next, via: 'cycle' });
    return next;
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
    captureEvent('appearance', { kind: 'theme', value: t, via: 'command' });
  }, []);
  const setSound = useCallback((on: boolean) => setSoundEnabled(on), []);

  const playSound = useCallback(
    (name: SoundName) => {
      if (soundEnabled) playTone(name);
    },
    [soundEnabled]
  );

  const value = useMemo<ShellControls>(
    () => ({
      stage,
      setStage,
      resetStage,
      theme,
      setTheme,
      cycleTheme,
      themes: THEMES,
      soundEnabled,
      setSound,
      playSound,
    }),
    [
      stage,
      setStage,
      resetStage,
      theme,
      setTheme,
      cycleTheme,
      soundEnabled,
      setSound,
      playSound,
    ]
  );

  return (
    <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
  );
}
