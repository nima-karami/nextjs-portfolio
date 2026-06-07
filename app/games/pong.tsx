'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { GameScreen } from './game-screen';
import type { GameProps } from './types';
import { useRaf } from './use-raf';

const W = 40;
const H = 18;
const PADDLE = 4;
const WIN = 7;
const PADDLE_SPEED = 22;
const AI_SPEED = 16;

export default function Pong({ onExit, playSound }: GameProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<'playing' | 'over'>('playing');
  const [pScore, setPScore] = useState(0);
  const [aScore, setAScore] = useState(0);

  const g = useRef({
    py: (H - PADDLE) / 2,
    ay: (H - PADDLE) / 2,
    bx: W / 2,
    by: H / 2,
    vx: 14,
    vy: 6,
    up: false,
    down: false,
    p: 0,
    a: 0,
    over: false,
  });

  const draw = useCallback(() => {
    const s = g.current;
    const grid: string[][] = Array.from({ length: H }, () => Array(W).fill(' '));
    // net
    for (let r = 0; r < H; r += 2) grid[r][Math.floor(W / 2)] = ':';
    // paddles
    for (let i = 0; i < PADDLE; i++) {
      const py = Math.round(s.py) + i;
      const ay = Math.round(s.ay) + i;
      if (py >= 0 && py < H) grid[py][1] = '#';
      if (ay >= 0 && ay < H) grid[ay][W - 2] = '#';
    }
    // ball
    const bx = Math.round(s.bx);
    const by = Math.round(s.by);
    if (bx >= 0 && bx < W && by >= 0 && by < H) grid[by][bx] = 'O';
    const edge = '+' + '-'.repeat(W) + '+';
    const body = grid.map((r) => '|' + r.join('') + '|').join('\n');
    if (preRef.current) preRef.current.textContent = `${edge}\n${body}\n${edge}`;
  }, []);

  const serve = useCallback((dir: number) => {
    const s = g.current;
    s.bx = W / 2;
    s.by = H / 2;
    s.vx = dir * 14;
    s.vy = (Math.random() * 2 - 1) * 8;
  }, []);

  const initBoard = useCallback(() => {
    const s = g.current;
    s.py = (H - PADDLE) / 2;
    s.ay = (H - PADDLE) / 2;
    s.p = 0;
    s.a = 0;
    s.over = false;
    serve(Math.random() < 0.5 ? -1 : 1);
    draw();
  }, [draw, serve]);

  const reset = useCallback(() => {
    initBoard();
    setPScore(0);
    setAScore(0);
    setStatus('playing');
  }, [initBoard]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  useEffect(() => {
    const set = (k: string, down: boolean) => {
      const s = g.current;
      if (k === 'arrowup' || k === 'w') s.up = down;
      else if (k === 'arrowdown' || k === 's') s.down = down;
    };
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'escape' || k === 'q') {
        e.preventDefault();
        onExit();
        return;
      }
      if (g.current.over) {
        if (k === 'r') {
          e.preventDefault();
          reset();
        }
        return;
      }
      if (['arrowup', 'arrowdown', 'w', 's'].includes(k)) {
        e.preventDefault();
        set(k, true);
      }
    };
    const onUp = (e: KeyboardEvent) => set(e.key.toLowerCase(), false);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [onExit, reset]);

  useRaf((dt) => {
    const s = g.current;
    if (s.over) return;

    // player paddle
    const pv = (s.down ? 1 : 0) - (s.up ? 1 : 0);
    s.py = Math.max(0, Math.min(H - PADDLE, s.py + pv * PADDLE_SPEED * dt));

    // ai tracks the ball, capped speed (beatable)
    const target = s.by - PADDLE / 2;
    if (Math.abs(target - s.ay) > 0.4) {
      s.ay += Math.sign(target - s.ay) * AI_SPEED * dt;
      s.ay = Math.max(0, Math.min(H - PADDLE, s.ay));
    }

    // ball
    s.bx += s.vx * dt;
    s.by += s.vy * dt;
    if (s.by < 1) {
      s.by = 1;
      s.vy = Math.abs(s.vy);
    } else if (s.by > H - 2) {
      s.by = H - 2;
      s.vy = -Math.abs(s.vy);
    }

    // paddle collisions
    if (s.vx < 0 && s.bx <= 2 && s.by >= s.py - 0.5 && s.by <= s.py + PADDLE + 0.5) {
      s.bx = 2;
      s.vx = Math.abs(s.vx) * 1.05;
      s.vy += (s.by - (s.py + PADDLE / 2)) * 3;
      playSound('hit');
    } else if (
      s.vx > 0 &&
      s.bx >= W - 3 &&
      s.by >= s.ay - 0.5 &&
      s.by <= s.ay + PADDLE + 0.5
    ) {
      s.bx = W - 3;
      s.vx = -Math.abs(s.vx) * 1.05;
      s.vy += (s.by - (s.ay + PADDLE / 2)) * 3;
      playSound('hit');
    }

    // scoring
    if (s.bx < 0) {
      s.a += 1;
      setAScore(s.a);
      playSound('score');
      if (s.a >= WIN) {
        s.over = true;
        setStatus('over');
      } else serve(-1);
    } else if (s.bx > W) {
      s.p += 1;
      setPScore(s.p);
      playSound('score');
      if (s.p >= WIN) {
        s.over = true;
        setStatus('over');
      } else serve(1);
    }

    draw();
  });

  return (
    <GameScreen
      title={`pong   you ${pScore} — ${aScore} cpu`}
      cols={W + 2}
      rows={H + 2}
      hint={
        status === 'over' ? (
          <span className={pScore > aScore ? 'text-term-green' : 'text-term-amber'}>
            {pScore > aScore ? 'you win' : 'cpu wins'} — R rematch · ESC quit
          </span>
        ) : (
          '↑/↓ or W/S · first to 7 · ESC to quit'
        )
      }
    >
      <pre ref={preRef} className="text-term-fg leading-none" />
    </GameScreen>
  );
}
