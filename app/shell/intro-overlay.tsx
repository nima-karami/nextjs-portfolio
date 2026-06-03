'use client';

import { profile } from '../data/profile';

// Pre-enter boot text. Kept in the bottom-left corner as plain terminal lines
// (over the dark vignette) rather than a centered hero, so nothing floats on
// top of the portrait subject.
export default function IntroOverlay({ reduced }: { reduced: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-start justify-end p-4 md:p-6">
      <p className="text-term-fg text-xl tracking-[0.2em] uppercase md:text-2xl">
        {profile.name}
      </p>
      <p className="text-term-dim mt-0.5 text-[11px] tracking-[0.25em] uppercase">
        {profile.title}
      </p>
      <p
        className={`text-term-accent mt-4 text-sm tracking-widest ${reduced ? '' : 'animate-pulse'}`}
      >
        press any key to enter ▮
      </p>
    </div>
  );
}
