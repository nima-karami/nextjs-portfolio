import type { ThemeName } from './types';

export const THEME_LABELS: Record<ThemeName, string> = {
  dark: 'dark — default',
  'crt-green': 'CRT green phosphor',
  'crt-amber': 'CRT amber',
  paper: 'paper — light',
};

// Glyph ink + panel background for the ASCII renderer, per theme. (The terminal
// UI itself recolors via the CSS token overrides in globals.css.)
export const ASCII_COLORS: Record<ThemeName, { ink: string; bg: string }> = {
  dark: { ink: '#c7d0d9', bg: '#0a0e14' },
  'crt-green': { ink: '#46ff7a', bg: '#02160b' },
  'crt-amber': { ink: '#ffb000', bg: '#150d02' },
  paper: { ink: '#2b2926', bg: '#f2efe6' },
};
