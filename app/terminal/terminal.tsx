'use client';

import { useEffect, useRef } from 'react';

import Stage from '../ascii/stage';
import Banner from './banner';
import InputLine from './input-line';
import Output from './output';
import { useTerminal } from './use-terminal';

export default function Terminal() {
  const { lines, history, run } = useTerminal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the newest line in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Clicking anywhere in the terminal focuses the input (unless selecting text).
  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    wrapRef.current?.querySelector('input')?.focus();
  };

  return (
    <main
      onClick={focusInput}
      className="flex h-dvh flex-col p-4 md:p-6"
      aria-label="Interactive terminal"
    >
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        <Stage />
        <Banner />
        <Output lines={lines} />
        <div ref={wrapRef}>
          <InputLine onRun={run} history={history} />
        </div>
      </div>
    </main>
  );
}
