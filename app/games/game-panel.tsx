'use client';

import { useEffect, useRef, type ComponentType } from 'react';

import { useShell } from '../shell/shell-context';
import type { GameName } from '../shell/types';
import Invaders from './invaders';
import Snake from './snake';
import type { GameProps } from './types';

const GAMES: Partial<Record<GameName, ComponentType<GameProps>>> = {
  snake: Snake,
  invaders: Invaders,
};

export default function GamePanel({ game }: { game: GameName }) {
  const shell = useShell();
  const ref = useRef<HTMLDivElement>(null);

  const onExit = () => {
    shell.resetStage();
    // hand keyboard focus back to the terminal input
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('[aria-label="terminal input"]')?.focus();
    }, 0);
  };

  // Take focus so game keys don't leak into the terminal input.
  useEffect(() => {
    ref.current?.focus();
    const active = document.activeElement;
    if (active instanceof HTMLInputElement) active.blur();
  }, []);

  const Game = GAMES[game];

  return (
    <div ref={ref} tabIndex={-1} className="h-full w-full outline-none">
      {Game ? (
        <Game onExit={onExit} playSound={shell.playSound} />
      ) : (
        <div className="text-term-dim flex h-full items-center justify-center">
          {game} — coming soon. ESC to quit.
        </div>
      )}
    </div>
  );
}
