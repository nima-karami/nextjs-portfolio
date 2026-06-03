'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { registry } from './commands';
import Prompt from './prompt';

type InputLineProps = {
  onRun: (input: string) => void;
  history: string[];
};

export default function InputLine({ onRun, history }: InputLineProps) {
  const [value, setValue] = useState('');
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onRun(value);
      setValue('');
      setHistIndex(null);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setValue(history[idx]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === null) return;
      const idx = histIndex + 1;
      if (idx >= history.length) {
        setHistIndex(null);
        setValue('');
      } else {
        setHistIndex(idx);
        setValue(history[idx]);
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const prefix = value.trim().toLowerCase();
      if (!prefix) return;
      const matches = Object.keys(registry).filter((n) => n.startsWith(prefix));
      if (matches.length === 1) setValue(matches[0] + ' ');
      return;
    }

    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      onRun('clear');
      setValue('');
      return;
    }

    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      setValue('');
      setHistIndex(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Prompt />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="terminal input"
        className="text-term-fg caret-term-accent flex-1 bg-transparent outline-none"
        autoFocus
      />
    </div>
  );
}
