'use client';

import { profile } from '../data/profile';

// Fullscreen-feeling overlay shown before the visitor enters. Sits over the
// portrait panel (which is full-width pre-enter) with the name + a prompt.
export default function IntroOverlay({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-end p-8 pb-12 text-center"
      style={{
        background:
          'linear-gradient(to top, rgba(10,14,20,0.88), rgba(10,14,20,0) 45%)',
      }}
    >
      <p className="text-term-dim text-[11px] tracking-[0.3em] uppercase">
        {profile.title}
      </p>
      <p className="text-term-fg mt-1 text-2xl tracking-[0.2em] uppercase md:text-3xl">
        {profile.name}
      </p>
      <p
        className={`text-term-accent mt-5 text-sm tracking-widest ${reduced ? '' : 'animate-pulse'}`}
      >
        press any key to enter ▮
      </p>
    </div>
  );
}
