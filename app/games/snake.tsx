'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { GameScreen } from './game-screen';
import type { GameProps } from './types';
import { useRaf } from './use-raf';

const W = 30;
const H = 18;

type P = { x: number; y: number };
type Dir = 'up' | 'down' | 'left' | 'right';

const VEC: Record<Dir, P> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPP: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };

function spawnFood(snake: P[]): P {
  let p: P;
  do {
    p = { x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

export default function Snake({ onExit, playSound }: GameProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<'playing' | 'over'>('playing');
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);

  const g = useRef({
    snake: [] as P[],
    dir: 'right' as Dir,
    nextDir: 'right' as Dir,
    food: { x: 0, y: 0 } as P,
    acc: 0,
    step: 0.12,
    dead: false,
    started: false,
  });

  const draw = useCallback(() => {
    const s = g.current;
    const grid: string[][] = Array.from({ length: H }, () => Array(W).fill(' '));
    grid[s.food.y][s.food.x] = '*';
    s.snake.forEach((p, i) => {
      grid[p.y][p.x] = i === 0 ? '@' : 'o';
    });
    // ASCII border only — box-drawing glyphs fall back to a wider font in
    // JetBrains Mono and break grid alignment.
    const edge = '+' + '-'.repeat(W) + '+';
    const body = grid.map((r) => '|' + r.join('') + '|').join('\n');
    if (preRef.current) preRef.current.textContent = `${edge}\n${body}\n${edge}`;
  }, []);

  // Populate the board into the ref (no React state) — safe to run in effects.
  const initBoard = useCallback(() => {
    const s = g.current;
    s.snake = [
      { x: 8, y: 9 },
      { x: 7, y: 9 },
      { x: 6, y: 9 },
    ];
    s.dir = 'right';
    s.nextDir = 'right';
    s.food = spawnFood(s.snake);
    s.acc = 0;
    s.step = 0.12;
    s.dead = false;
    s.started = false;
    draw();
  }, [draw]);

  // Full restart (also resets the React state driving the hint/score/over UI).
  const reset = useCallback(() => {
    initBoard();
    setScore(0);
    setStatus('playing');
    setStarted(false);
  }, [initBoard]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'escape' || k === 'q') {
        e.preventDefault();
        onExit();
        return;
      }
      if (g.current.dead) {
        if (k === 'r') {
          e.preventDefault();
          reset();
        }
        return;
      }
      const map: Record<string, Dir> = {
        arrowup: 'up',
        w: 'up',
        arrowdown: 'down',
        s: 'down',
        arrowleft: 'left',
        a: 'left',
        arrowright: 'right',
        d: 'right',
      };
      const nd = map[k];
      if (nd) {
        e.preventDefault();
        if (!g.current.started) {
          g.current.started = true;
          setStarted(true);
        }
        if (nd !== OPP[g.current.dir]) g.current.nextDir = nd;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit, reset]);

  useRaf((dt) => {
    const s = g.current;
    if (s.dead || !s.started) return;
    s.acc += dt;
    if (s.acc < s.step) return;
    s.acc = 0;
    s.dir = s.nextDir;

    const head = s.snake[0];
    const nh = { x: head.x + VEC[s.dir].x, y: head.y + VEC[s.dir].y };
    const hit =
      nh.x < 0 ||
      nh.x >= W ||
      nh.y < 0 ||
      nh.y >= H ||
      s.snake.some((p) => p.x === nh.x && p.y === nh.y);
    if (hit) {
      s.dead = true;
      setStatus('over');
      playSound('die');
      return;
    }

    s.snake.unshift(nh);
    if (nh.x === s.food.x && nh.y === s.food.y) {
      setScore((v) => v + 1);
      playSound('score');
      s.step = Math.max(0.06, s.step - 0.004);
      s.food = spawnFood(s.snake);
    } else {
      s.snake.pop();
    }
    draw();
  });

  return (
    <GameScreen
      title="snake"
      score={score}
      hint={
        status === 'over' ? (
          <span className="text-term-amber">game over — R restart · ESC quit</span>
        ) : started ? (
          'arrows / WASD · ESC to quit'
        ) : (
          <span className="text-term-accent">press an arrow to start · ESC to quit</span>
        )
      }
    >
      <pre ref={preRef} className="text-term-fg text-[15px] leading-none" />
    </GameScreen>
  );
}
