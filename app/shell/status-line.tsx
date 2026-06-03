'use client';

import { profile } from '../data/profile';

// Slim editorial status strip beneath the panels (mid chrome). Hidden until the
// visitor enters.
export default function StatusLine({
  visible,
  reduced,
}: {
  visible: boolean;
  reduced: boolean;
}) {
  return (
    <div
      className={`text-term-dim flex items-center justify-between px-1 transition-opacity ${
        reduced ? 'duration-0' : 'duration-700'
      } ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <span>v2.0.0</span>
      <span className="text-term-accent hidden sm:inline">visitor session</span>
      <span>{profile.location}</span>
    </div>
  );
}
