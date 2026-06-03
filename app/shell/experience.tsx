'use client';

import { useEffect, useRef, useState } from 'react';

import Stage from '../ascii/stage';
import Terminal from '../terminal/terminal';
import { useMediaQuery, usePrefersReducedMotion } from '../util/hooks';
import AsciiFrame from './ascii-frame';
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

  // Stepped (not eased) so the split snaps column-by-column like a redrawing
  // terminal rather than gliding.
  const gridTransition = reduced
    ? 'none'
    : 'grid-template-columns 700ms steps(16, end), grid-template-rows 700ms steps(16, end)';

  return (
    <main className="flex h-dvh flex-col gap-2 p-3 md:gap-3 md:p-4">
      <div
        className="grid min-h-0 flex-1 gap-3 md:gap-4"
        style={{ ...gridStyle, transition: gridTransition }}
      >
        <section ref={terminalRef} className="min-h-0 min-w-0 overflow-hidden">
          <AsciiFrame title="terminal">
            <Terminal />
          </AsciiFrame>
        </section>
        <section className="min-h-0 min-w-0 overflow-hidden">
          <AsciiFrame title="portrait" meta="ascii" contentClassName="relative">
            <Stage />
            {!entered && <IntroOverlay reduced={reduced} />}
          </AsciiFrame>
        </section>
      </div>
      <StatusLine visible={entered} reduced={reduced} />
    </main>
  );
}
