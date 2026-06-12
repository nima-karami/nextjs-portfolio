'use client';

import { useEffect, useRef } from 'react';

// Classic falling-glyph "matrix" rain on a 2D canvas. Reads the theme tokens
// each frame so it recolors with the active theme.
const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネ0123456789ABCDEFﾘｱｳｴｵｶ<>/\\*+=';

export default function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 16;
    let cols = 0;
    let drops: number[] = [];
    let raf = 0;
    let acc = 0;

    const css = (v: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(v).trim() ||
      fallback;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width);
      canvas.height = Math.max(1, r.height);
      cols = Math.ceil(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Respect reduced-motion: paint a single static field, don't animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const fg = css('--color-term-fg', '#46ff7a');
      ctx.fillStyle = css('--color-term-bg', '#0a0e14');
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      ctx.fillStyle = fg;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < Math.random() * 6; j++) {
          const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          ctx.fillText(ch, i * fontSize, Math.random() * canvas.height);
        }
      }
      return () => ro.disconnect();
    }

    let last = performance.now();
    const loop = (t: number) => {
      const dt = t - last;
      last = t;
      acc += dt;
      if (acc >= 55) {
        acc = 0;
        const bg = css('--color-term-bg', '#0a0e14');
        const fg = css('--color-term-fg', '#46ff7a');
        const accent = css('--color-term-accent', '#9bffc4');

        // fade previous frame toward bg
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        ctx.font = `${fontSize}px ui-monospace, monospace`;
        for (let i = 0; i < cols; i++) {
          const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillStyle = accent; // bright leading glyph
          ctx.fillText(ch, x, y);
          ctx.fillStyle = fg;
          ctx.fillText(
            GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            x,
            y - fontSize
          );
          if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}
