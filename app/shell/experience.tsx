'use client';

import { useEffect, useRef, useState } from 'react';

import Stage from '../ascii/stage';
import Terminal from '../terminal/terminal';
import { useMediaQuery, usePrefersReducedMotion } from '../util/hooks';
import IntroOverlay from './intro-overlay';
import StatusLine from './status-line';

// Owns the boot -> split transition. Pre-enter: the portrait fills the frame
// with the intro overlay. On the first key/tap: the terminal panel slides in
// (left on desktop, top on mobile) and the portrait settles into its half.
export default function Experience() {
  const [entered, setEntered] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduced = usePrefersReducedMotion();
  const terminalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (entered) return;
    const enter = () => setEntered(true);
    window.addEventListener('keydown', enter);
    window.addEventListener('pointerdown', enter);
    return () => {
      window.removeEventListener('keydown', enter);
      window.removeEventListener('pointerdown', enter);
    };
  }, [entered]);

  // Hand focus to the terminal once it's revealed.
  useEffect(() => {
    if (entered) terminalRef.current?.querySelector('input')?.focus();
  }, [entered]);

  const gridStyle = isDesktop
    ? {
        gridTemplateColumns: entered ? '1fr 1fr' : '0fr 1fr',
        gridTemplateRows: '1fr',
      }
    : {
        gridTemplateRows: entered ? '1fr 1.25fr' : '0fr 1fr',
        gridTemplateColumns: '1fr',
      };

  return (
    <main className="flex h-dvh flex-col gap-2 p-3 md:gap-3 md:p-4">
      <div
        className={`grid min-h-0 flex-1 gap-3 transition-all ease-out md:gap-4 ${
          reduced ? 'duration-0' : 'duration-700'
        }`}
        style={gridStyle}
      >
        <section
          ref={terminalRef}
          className="border-term-selection min-h-0 min-w-0 overflow-hidden rounded-sm border"
        >
          <Terminal />
        </section>
        <section className="border-term-selection relative min-h-0 min-w-0 overflow-hidden rounded-sm border">
          <Stage />
          {!entered && <IntroOverlay reduced={reduced} />}
        </section>
      </div>
      <StatusLine visible={entered} reduced={reduced} />
    </main>
  );
}
