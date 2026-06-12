// Small pacing helper so content builds line-by-line instead of dumping all at
// once. Honours prefers-reduced-motion (resolves instantly).
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const sleep = (ms: number) =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, prefersReduced() ? 0 : ms)
  );
