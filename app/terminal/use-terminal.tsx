'use client';

import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { useShell } from '../shell/shell-context';
import { captureEvent } from '../util/analytics';
import { registry } from './commands';

export type Line = {
  id: number;
  kind: 'input' | 'output';
  content: ReactNode;
};

export function useTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const idRef = useRef(0);
  const shell = useShell();

  const append = useCallback((kind: Line['kind'], content: ReactNode) => {
    setLines((prev) => [...prev, { id: ++idRef.current, kind, content }]);
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const run = useCallback(
    async (input: string) => {
      append('input', input);

      const trimmed = input.trim();
      if (!trimmed) return;

      setHistory((h) => [...h, trimmed]);

      const [rawName, ...args] = trimmed.split(/\s+/);
      const name = rawName.toLowerCase();
      captureEvent('command_run', { command: name, args });

      const command = registry[name];
      if (!command) {
        append(
          'output',
          <span className="text-term-red">
            command not found: {rawName}. Type{' '}
            <span className="text-term-accent">help</span>.
          </span>
        );
        return;
      }

      await command.run({
        args,
        print: (node) => append('output', node),
        clear,
        registry,
        shell,
      });
    },
    [append, clear, shell]
  );

  return { lines, history, run, clear };
}
