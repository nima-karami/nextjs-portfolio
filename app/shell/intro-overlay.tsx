'use client';

import { profile } from '../data/profile';

// Name as a figlet (Standard) banner — the terminal-authentic way to render
// "big" text: many same-size cells forming large glyphs. Everything here is
// one font at one size; hierarchy comes only from color/weight.
const NAME_BANNER = String.raw`  _   _ ___ __  __    _
 | \ | |_ _|  \/  |  / \
 |  \| || || |\/| | / _ \
 | |\  || || |  | |/ ___ \
 |_| \_|___|_|  |_/_/   \_\
  _  __    _    ____      _    __  __ ___
 | |/ /   / \  |  _ \    / \  |  \/  |_ _|
 | ' /   / _ \ | |_) |  / _ \ | |\/| || |
 | . \  / ___ \|  _ <  / ___ \| |  | || |
 |_|\_\/_/   \_\_| \_\/_/   \_\_|  |_|___|`;

export default function IntroOverlay({ reduced }: { reduced: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-start justify-end gap-3 overflow-hidden p-4 md:p-6">
      <pre className="text-term-fg leading-none">{NAME_BANNER}</pre>
      <div>
        <p className="text-term-dim">{profile.title}</p>
        <p className={`text-term-accent ${reduced ? '' : 'animate-pulse'}`}>
          press any key to enter ▮
        </p>
      </div>
    </div>
  );
}
