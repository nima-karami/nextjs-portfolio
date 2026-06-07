'use client';

import { useEffect, useState } from 'react';

import { profile } from '../data/profile';

// Name as a figlet (Standard) banner — the terminal-authentic way to render
// "big" text: many same-size cells forming large glyphs.
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

const BANNER_LINES = NAME_BANNER.split('\n');
const TITLE = profile.title;

// Subtle boot teletype: banner reveals line-by-line, then the title types out,
// then the prompt appears. Skipped entirely under reduced-motion.
export default function IntroOverlay({ reduced }: { reduced: boolean }) {
  const [lines, setLines] = useState(reduced ? BANNER_LINES.length : 0);
  const [titleLen, setTitleLen] = useState(reduced ? TITLE.length : 0);
  const [showPrompt, setShowPrompt] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setInterval>[] = [];

    const lineTimer = setInterval(() => {
      setLines((n) => {
        const next = n + 1;
        if (next >= BANNER_LINES.length) {
          clearInterval(lineTimer);
          const charTimer = setInterval(() => {
            setTitleLen((c) => {
              const nc = c + 1;
              if (nc >= TITLE.length) {
                clearInterval(charTimer);
                setShowPrompt(true);
              }
              return nc;
            });
          }, 16);
          timers.push(charTimer);
        }
        return next;
      });
    }, 45);
    timers.push(lineTimer);

    return () => timers.forEach(clearInterval);
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-start justify-end gap-3 overflow-hidden p-4 md:p-6">
      <pre className="text-term-fg -ml-[2ch] leading-none">
        {BANNER_LINES.slice(0, lines).join('\n')}
      </pre>
      <div>
        <p className="text-term-dim">
          {TITLE.slice(0, titleLen)}
          {titleLen < TITLE.length && <span className="text-term-fg">▮</span>}
        </p>
        <p
          className={`text-term-accent ${showPrompt ? '' : 'opacity-0'} ${
            reduced ? '' : 'animate-pulse'
          }`}
        >
          press any key to enter ▮
        </p>
      </div>
    </div>
  );
}
