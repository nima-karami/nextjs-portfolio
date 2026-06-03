'use client';

import Prompt from './prompt';
import type { Line } from './use-terminal';

// Scrollback. The whole region is an aria-live container so screen readers
// announce command output as it is appended.
export default function Output({ lines }: { lines: Line[] }) {
  return (
    <div aria-live="polite" className="space-y-1">
      {lines.map((line) => (
        <div key={line.id} className="break-words whitespace-pre-wrap">
          {line.kind === 'input' ? (
            <div className="flex gap-2">
              <Prompt />
              <span>{line.content}</span>
            </div>
          ) : (
            line.content
          )}
        </div>
      ))}
    </div>
  );
}
