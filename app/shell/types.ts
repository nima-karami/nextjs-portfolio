// Shared shell vocabulary: what the right panel can show, the themes, and the
// control surface commands get via their context.

export type SceneName = 'portrait' | 'torus' | 'matrix' | 'skull';
export type GameName = 'snake' | 'invaders' | 'pong';

export type Stage =
  | { kind: 'scene'; scene: SceneName }
  | { kind: 'game'; game: GameName };

export type ThemeName = 'dark' | 'crt-green' | 'crt-amber' | 'paper';
export const THEMES: readonly ThemeName[] = ['dark', 'crt-green', 'crt-amber', 'paper'];

export type SoundName =
  | 'shoot'
  | 'hit'
  | 'score'
  | 'die'
  | 'key'
  | 'select';

// Control surface handed to commands (ctx.shell) so they can drive the panel,
// theme, and audio.
export type ShellControls = {
  stage: Stage;
  setStage: (s: Stage) => void;
  resetStage: () => void; // back to the portrait
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  cycleTheme: () => ThemeName;
  themes: readonly ThemeName[];
  soundEnabled: boolean;
  setSound: (on: boolean) => void;
  playSound: (name: SoundName) => void;
};
