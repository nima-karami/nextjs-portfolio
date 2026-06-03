'use client';

import { useEffect, useRef } from 'react';

import Banner from './banner';
import InputLine from './input-line';
import Output from './output';
import { useTerminal } from './use-terminal';

// Fills its panel; the ASCII stage lives in the sibling panel (see Experience).
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
    <div
      onClick={focusInput}
      className="flex h-full flex-col overflow-y-auto p-4"
      ref={scrollRef}
      aria-label="Interactive terminal"
    >
      <Banner />
      <Output lines={lines} />
      <div ref={wrapRef}>
        <InputLine onRun={run} history={history} />
      </div>
    </div>
  );
}
