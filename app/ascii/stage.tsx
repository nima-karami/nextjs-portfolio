'use client';

import dynamic from 'next/dynamic';

// Lazy + client-only so three/R3F stay out of the base bundle until the stage
// mounts.
const AsciiCanvas = dynamic(() => import('./ascii-canvas'), {
  ssr: false,
  loading: () => null,
});

export default function Stage() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <AsciiCanvas />
    </div>
  );
}
