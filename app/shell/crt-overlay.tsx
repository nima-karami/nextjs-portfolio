'use client';

import { useShell } from './shell-context';

// Pure-CSS scanline + vignette overlay, only for the CRT themes. Flicker is
// gated by prefers-reduced-motion in globals.css.
export default function CrtOverlay() {
  const { theme } = useShell();
  if (!theme.startsWith('crt')) return null;
  return <div className="crt-overlay" aria-hidden="true" />;
}
