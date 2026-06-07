import { useEffect, useRef } from 'react';

// requestAnimationFrame loop that hands the callback a delta in seconds. The
// callback is kept in a ref (updated in an effect, not during render) so the
// loop never restarts on re-render.
export function useRaf(cb: (dt: number) => void) {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); // clamp tab-switch jumps
      last = t;
      cbRef.current(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
}
