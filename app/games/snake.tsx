'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { GameScreen } from './game-screen';
import { createGrid, paint } from './grid';
import type { GameProps } from './types';
import { useRaf } from './use-raf';

type P = { x: number; y: number };
type Dir = 'up' | 'down' | 'left' | 'right';

const VEC: Record<Dir, P> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPP: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };

function spawnFood(snake: P[], w: number, h: number): P {
  let p: P;
  do {
    p = { x: Math.floor(Math.random() * w), y: Math.floor(Math.random() * h) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

export default function Snake({ cols, rows, onExit, playSound, onResult }: GameProps) {
  const W = cols - 2;
  const H = rows - 2;
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
    const grid = createGrid(W, H);
    grid[s.food.y][s.food.x] = '*';
    s.snake.forEach((p, i) => {
      if (p.y >= 0 && p.y < H && p.x >= 0 && p.x < W) grid[p.y][p.x] = i === 0 ? '@' : 'o';
    });
    paint(preRef.current, grid);
  }, [W, H]);

  const initBoard = useCallback(() => {
    const s = g.current;
    const cx = Math.max(3, Math.floor(W / 3));
    const cy = Math.floor(H / 2);
    s.snake = [
      { x: cx, y: cy },
      { x: cx - 1, y: cy },
      { x: cx - 2, y: cy },
    ];
    s.dir = 'right';
    s.nextDir = 'right';
    s.food = spawnFood(s.snake, W, H);
    s.acc = 0;
    s.step = 0.12;
    s.dead = false;
    s.started = false;
    draw();
  }, [W, H, draw]);

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
      onResult?.(s.snake.length - 3);
      return;
    }

    s.snake.unshift(nh);
    if (nh.x === s.food.x && nh.y === s.food.y) {
      setScore((v) => v + 1);
      playSound('score');
      s.step = Math.max(0.05, s.step - 0.003);
      s.food = spawnFood(s.snake, W, H);
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
      <pre ref={preRef} className="text-term-fg leading-none" />
    </GameScreen>
  );
}
