'use client';

import type { ReactNode } from 'react';

// Font size for the game grid — matches the terminal so everything reads as the
// same-size characters. The board is made bigger (more cells) to fill the
// panel; the glyphs stay terminal-sized.
export const GAME_FONT = 14;
export const GAME_CHAR_W = GAME_FONT * 0.6; // monospace advance ≈ 0.6em
export const GAME_LINE_H = GAME_FONT; // leading-none

// Shared centered layout for the character-grid games: title, the grid, hint.
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
      <div className="text-term-dim mb-2 text-center">
        {title}
        {score !== undefined && (
          <>
            {' '}
            · score <span className="text-term-accent">{score}</span>
          </>
        )}
      </div>
      <div style={{ fontSize: `${GAME_FONT}px`, lineHeight: 1 }}>{children}</div>
      <div className="text-term-dim mt-2 text-center">{hint}</div>
    </div>
  );
}
