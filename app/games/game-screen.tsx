'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Monospace advance width as a fraction of font-size (JetBrains Mono ≈ 0.6).
const CHAR_W = 0.6;

// Shared centered layout for the character-grid games. Measures its container
// and scales the grid font-size so the board fills the panel (title + hint
// lines reserved). `cols`/`rows` are the full grid dimensions incl. borders.
export function GameScreen({
  title,
  score,
  hint,
  cols,
  rows,
  children,
}: {
  title: string;
  score?: ReactNode;
  hint: ReactNode;
  cols: number;
  rows: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fs, setFs] = useState(14);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const availH = Math.max(40, h - 72); // room for title + hint
      const byW = (w * 0.97) / (cols * CHAR_W);
      const byH = availH / rows;
      setFs(Math.max(6, Math.min(byW, byH)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cols, rows]);

  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-2"
    >
      <div className="text-term-dim mb-2 text-center">
        {title}
        {score !== undefined && (
          <>
            {' '}
            · score <span className="text-term-accent">{score}</span>
          </>
        )}
      </div>
      <div style={{ fontSize: `${fs}px`, lineHeight: 1 }}>{children}</div>
      <div className="text-term-dim mt-2 text-center">{hint}</div>
    </div>
  );
}
