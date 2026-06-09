'use client';

import { useCallback, useRef } from 'react';

import { createStreamStore, type StreamStore } from './stream-store';

type ChatTurn = { role: 'user' | 'assistant'; content: string };

const MAX_HISTORY = 12; // last 6 turns (user+assistant)

// Client hook for the conversational layer. `send` echoes nothing itself — it
// returns a StreamStore immediately so the terminal can append one StreamLine to
// scrollback, then pumps the NDJSON response from /api/chat into that store.
// Keeps a rolling transcript so follow-up questions have context.
export function useChat() {
  const historyRef = useRef<ChatTurn[]>([]);

  const send = useCallback((message: string): StreamStore => {
    const store = createStreamStore();
    const history = historyRef.current;

    void (async () => {
      let full = '';
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history }),
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
        store.fail();
      } finally {
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
