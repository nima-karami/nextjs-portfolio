'use client';

import type { ReactNode } from 'react';

import cn from '../util/cn';

// A frame drawn with box-drawing characters instead of CSS borders, so the
// panels read as terminal chrome. Title sits in the top rule: ┌─ title ─────┐
const DASH = '─'.repeat(600);
const VBAR = `${'│\n'.repeat(300)}│`;

type AsciiFrameProps = {
  title?: string;
  meta?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function AsciiFrame({
  title,
  meta,
  children,
  className,
  contentClassName,
}: AsciiFrameProps) {
  return (
    <div
      className={cn(
        'text-term-dim grid h-full min-h-0 grid-rows-[auto_1fr_auto] leading-none',
        className
      )}
    >
      {/* top rule with optional title + right-aligned meta */}
      <div className="flex items-center overflow-hidden whitespace-pre select-none">
        <span>┌─ </span>
        {title && <span className="text-term-accent">{title} </span>}
        <span className="min-w-0 flex-1 overflow-hidden">{DASH}</span>
        {meta && <span className="text-term-dim"> {meta} </span>}
        <span>┐</span>
      </div>

      {/* sides + content */}
      <div className="flex min-h-0">
        <pre className="overflow-hidden select-none">{VBAR}</pre>
        <div className={cn('min-w-0 flex-1 overflow-hidden', contentClassName)}>
          {children}
        </div>
        <pre className="overflow-hidden select-none">{VBAR}</pre>
      </div>

      {/* bottom rule */}
      <div className="flex items-center overflow-hidden whitespace-pre select-none">
        <span>└</span>
        <span className="min-w-0 flex-1 overflow-hidden">{DASH}</span>
        <span>┘</span>
      </div>
    </div>
  );
}
