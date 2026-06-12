'use client';

import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { useShell } from '../shell/shell-context';
import { captureEvent } from '../util/analytics';
import StreamLine from './chat/stream-line';
import { useChat } from './chat/use-chat';
import { registry } from './commands';
import { commandCategory } from './commands/category';

export type Line = {
  id: number;
  kind: 'input' | 'output';
  content: ReactNode;
};

export function useTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const idRef = useRef(0);
  const shell = useShell();
  const chat = useChat();

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

      // Accept-both parsing: strip a single leading '/'. If the first token is a
      // registered command, run it (so `help` and `/help` both work). Otherwise
      // the full raw line is a chat message for Nima's assistant.
      const candidate = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
      const [rawName, ...args] = candidate.split(/\s+/);
      const name = rawName.toLowerCase();
      const command = name ? registry[name] : undefined;

      if (command) {
        captureEvent('command', {
          status: 'run',
          command_name: name,
          command_category: commandCategory(name),
          command_args: args,
        });
        await command.run({
          args,
          print: (node) => append('output', node),
          clear,
          registry,
          shell,
        });
        return;
      }

      // Unmatched. A leading slash means they aimed for a command that doesn't
      // exist — a friction signal — but we still route the text to chat.
      if (trimmed.startsWith('/')) {
        captureEvent('command', {
          status: 'miss',
          command_name: name,
          command_args: args,
        });
      }

      // Chat path — the full raw line becomes the message.
      captureEvent('chat', {
        status: 'sent',
        question_text: trimmed.slice(0, 200),
        question_chars: trimmed.length,
      });
      setBusy(true);
      const store = chat.send(trimmed);
      append('output', <StreamLine store={store} />);
      try {
        await store.done;
      } finally {
        setBusy(false);
      }
    },
    [append, clear, shell, chat]
  );

  return { lines, history, busy, run, clear };
}
