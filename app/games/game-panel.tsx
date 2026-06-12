'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';

import { useShell } from '../shell/shell-context';
import type { GameName } from '../shell/types';
import { captureEvent } from '../util/analytics';
import { GAME_CHAR_W, GAME_LINE_H } from './game-screen';
import Invaders from './invaders';
import Pong from './pong';
import Snake from './snake';
import type { GameProps } from './types';

const GAMES: Partial<Record<GameName, ComponentType<GameProps>>> = {
  snake: Snake,
  invaders: Invaders,
  pong: Pong,
};

export default function GamePanel({ game }: { game: GameName }) {
  const shell = useShell();
  const [dims, setDims] = useState<{ cols: number; rows: number } | null>(null);
  const startRef = useRef(0);

  // One `game:start` per opened game; resets the clock for duration on over.
  useEffect(() => {
    startRef.current = performance.now();
    captureEvent('game', { status: 'start', game_name: game });
  }, [game]);

  const onResult = useCallback(
    (score: number) => {
      captureEvent('game', {
        status: 'over',
        game_name: game,
        game_score: score,
        duration_ms: Math.round(performance.now() - startRef.current),
      });
    },
    [game]
  );

  const onExit = () => {
    shell.resetStage();
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('[aria-label="terminal input"]')?.focus();
    }, 0);
  };

  // Callback ref: on mount, take focus and size the board to fill the panel at
  // the terminal character size (more cells, not bigger glyphs).
  const mount = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    el.focus();
    const active = document.activeElement;
    if (active instanceof HTMLInputElement) active.blur();
    const w = el.clientWidth;
    const h = el.clientHeight;
    const cols = Math.max(24, Math.min(120, Math.floor((w - 16) / GAME_CHAR_W)));
    const rows = Math.max(14, Math.min(64, Math.floor((h - 64) / GAME_LINE_H)));
    setDims({ cols, rows });
  }, []);

  const Game = GAMES[game];

  return (
    <div ref={mount} tabIndex={-1} className="h-full w-full outline-none">
      {Game && dims ? (
        <Game
          cols={dims.cols}
          rows={dims.rows}
          onExit={onExit}
          playSound={shell.playSound}
          onResult={onResult}
        />
      ) : null}
    </div>
  );
}
