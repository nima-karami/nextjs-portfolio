'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { playTone } from './audio';
import {
  THEMES,
  type ShellControls,
  type SoundName,
  type Stage,
  type ThemeName,
} from './types';

const ShellContext = createContext<ShellControls | null>(null);

export function useShell(): ShellControls {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error('useShell must be used within <ShellProvider>');
  return ctx;
}

export function ShellProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>({ kind: 'scene', scene: 'portrait' });
  const [theme, setThemeState] = useState<ThemeName>('dark');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Apply theme via a data attribute; globals.css overrides the --color-term-*
  // tokens per theme so every utility updates.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const resetStage = useCallback(
    () => setStage({ kind: 'scene', scene: 'portrait' }),
    []
  );

  const cycleTheme = useCallback(() => {
    let next: ThemeName = 'dark';
    setThemeState((cur) => {
      const i = THEMES.indexOf(cur);
      next = THEMES[(i + 1) % THEMES.length];
      return next;
    });
    return next;
  }, []);

  const setTheme = useCallback((t: ThemeName) => setThemeState(t), []);
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
    [stage, resetStage, theme, setTheme, cycleTheme, soundEnabled, setSound, playSound]
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}
