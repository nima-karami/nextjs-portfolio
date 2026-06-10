'use client';

import { useCallback, useEffect, useRef } from 'react';

import { createStreamStore, type StreamStore } from './stream-store';

type ChatTurn = { role: 'user' | 'assistant'; content: string };

const MAX_HISTORY = 12; // last 6 turns (user+assistant)
const REQUEST_TIMEOUT_MS = 90_000; // hard ceiling so a turn never hangs forever

// Client hook for the conversational layer. `send` echoes nothing itself — it
// returns a StreamStore immediately so the terminal can append one StreamLine to
// scrollback, then pumps the NDJSON response from /api/chat into that store.
// Keeps a rolling transcript so follow-up questions have context.
export function useChat() {
  const historyRef = useRef<ChatTurn[]>([]);

  // Wake the scale-to-zero MCP once on mount so the first question is fast.
  useEffect(() => {
    fetch('/api/warmup', { method: 'POST' }).catch(() => {});
  }, []);

  const send = useCallback((message: string): StreamStore => {
    const store = createStreamStore();
    const history = historyRef.current;

    void (async () => {
      let full = '';
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history }),
          signal: ctrl.signal,
        });

        if (!res.ok || !res.body) {
          store.fail();
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let nl: number;
          while ((nl = buffer.indexOf('\n')) >= 0) {
            const raw = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!raw) continue;

            let evt: { type: string; text?: string; name?: string; message?: string };
            try {
              evt = JSON.parse(raw);
            } catch {
              continue;
            }

            if (evt.type === 'token' && evt.text) {
              full += evt.text;
              store.pushToken(evt.text);
            } else if (evt.type === 'tool' && evt.name) {
              store.setTool(evt.name);
            } else if (evt.type === 'error') {
              store.fail(evt.message);
              return;
            } else if (evt.type === 'done') {
              store.finalize();
            }
          }
        }

        store.finalize();
      } catch {
        store.fail(
          full.trim()
            ? undefined
            : "That took longer than I'd like — mind trying again? Or grab `/resume` for the quick version."
        );
      } finally {
        clearTimeout(timeout);
        if (full.trim()) {
          const turns: ChatTurn[] = [
            ...history,
            { role: 'user', content: message },
            { role: 'assistant', content: full },
          ];
          historyRef.current = turns.slice(-MAX_HISTORY);
        }
      }
    })();

    return store;
  }, []);

  return { send };
}
