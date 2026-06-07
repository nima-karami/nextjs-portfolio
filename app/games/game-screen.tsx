import type { ReactNode } from 'react';

// Shared centered layout for the character-grid games: title line, the grid
// <pre>, and a hint line.
export function GameScreen({
  title,
  score,
  hint,
  children,
}: {
  title: string;
  score?: ReactNode;
  hint: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-2">
      <div className="text-term-dim mb-1 text-center">
        {title}
        {score !== undefined && <> · score <span className="text-term-accent">{score}</span></>}
      </div>
      {children}
      <div className="text-term-dim mt-1 text-center">{hint}</div>
    </div>
  );
}
