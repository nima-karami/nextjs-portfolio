'use client';

import { useEffect, useState } from 'react';

import { usePrefersReducedMotion } from '../../util/hooks';

// A single-cell spinner that cycles through the classic terminal frames — the
// one "thinking" indicator, in the spirit of a CLI spinner. Deliberately plain
// ASCII: the terminal's JetBrains Mono is loaded via next/font as a latin subset,
// so non-ASCII glyphs (braille, blocks) fall back to a wider font and break the
// monospace cell. `| / - \` is guaranteed in-font and exactly one cell wide.
// Under reduced-motion it holds a static frame.
const FRAMES = ['|', '/', '-', '\\'];

export function Spinner() {
  const reduced = usePrefersReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 90);
    return () => clearInterval(id);
  }, [reduced]);

  return <span className="text-term-accent">{reduced ? FRAMES[0] : FRAMES[frame]}</span>;
}
