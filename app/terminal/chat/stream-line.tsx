'use client';

import { useSyncExternalStore } from 'react';

import Markdown from 'markdown-to-jsx';

import { Spinner } from './spinner';
import type { StreamStore } from './stream-store';

// Block markdown tuned for the terminal: tight spacing, term-* colors, no prose
// margins. Only used once the turn settles — while streaming we render plain
// text so partial/unclosed markdown never flickers.
function ChatMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      options={{
        overrides: {
          p: { props: { className: 'mb-2 last:mb-0' } },
          strong: { props: { className: 'text-term-fg font-semibold' } },
          em: { props: { className: 'italic' } },
          code: {
            props: { className: 'text-term-accent' },
          },
          ul: { props: { className: 'mb-2 list-disc space-y-0.5 pl-5 last:mb-0' } },
          ol: { props: { className: 'mb-2 list-decimal space-y-0.5 pl-5 last:mb-0' } },
          a: {
            props: {
              className: 'text-term-accent underline underline-offset-2',
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        },
      }}
    >
      {children}
    </Markdown>
  );
}

export default function StreamLine({ store }: { store: StreamStore }) {
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );

  if (state.status === 'error') {
    return <p className="text-term-red">{state.text}</p>;
  }

  if (state.status === 'done') {
    return (
      <div className="text-term-fg">
        <ChatMarkdown>{state.text}</ChatMarkdown>
      </div>
    );
  }

  // Streaming. Before any text arrives, a single spinner is the one "thinking"
  // indicator (label switches to the tool affordance while one runs). Once text
  // streams in, it renders as plain text with a blinking caret — and the spinner
  // returns inline only if a tool fires mid-answer.
  const label = state.tool ? 'checking my records…' : 'thinking…';

  if (!state.text) {
    return (
      <div className="text-term-dim">
        <Spinner /> {label}
      </div>
    );
  }

  return (
    <div className="text-term-fg whitespace-pre-wrap">
      {state.text}
      {state.tool ? (
        <span className="text-term-dim">
          {' '}
          <Spinner /> checking my records…
        </span>
      ) : (
        <span className="text-term-accent animate-pulse"> ▮</span>
      )}
    </div>
  );
}
