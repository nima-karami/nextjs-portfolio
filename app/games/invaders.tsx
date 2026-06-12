'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { GameScreen } from './game-screen';
import { createGrid, paint } from './grid';
import type { GameProps } from './types';
import { useRaf } from './use-raf';

type Enemy = { x: number; y: number; alive: boolean };
type Shot = { x: number; y: number };

export default function Invaders({
  cols,
  rows,
  onExit,
  playSound,
  onResult,
}: GameProps) {
  const W = cols - 2;
  const H = rows - 2;
  const PLAYER_Y = H - 1;
  const ECOLS = Math.max(4, Math.min(18, Math.floor((W - 3) / 3)));
  const EROWS = Math.max(2, Math.min(5, Math.floor(H / 8)));
  const TOTAL = ECOLS * EROWS;

  const makeEnemies = useCallback((): Enemy[] => {
    const e: Enemy[] = [];
    for (let r = 0; r < EROWS; r++) {
      for (let c = 0; c < ECOLS; c++) {
        e.push({ x: 2 + c * 3, y: 1 + r * 2, alive: true });
      }
    }
    return e;
  }, [ECOLS, EROWS]);

  const preRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<'playing' | 'over' | 'win'>('playing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const g = useRef({
    px: Math.floor(W / 2),
    lives: 3,
    enemies: [] as Enemy[],
    dir: 1,
    shots: [] as Shot[],
    bombs: [] as Shot[],
    enemyAcc: 0,
    enemyStep: 0.55,
    bulletAcc: 0,
    bombAcc: 0,
    cooldown: 0,
    over: false,
    score: 0,
  });

  const draw = useCallback(() => {
    const s = g.current;
    const grid = createGrid(W, H);
    s.enemies.forEach((e) => {
      if (e.alive && e.y >= 0 && e.y < H) grid[e.y][e.x] = 'W';
    });
    s.shots.forEach((b) => {
      if (b.y >= 0 && b.y < H) grid[b.y][b.x] = '|';
    });
    s.bombs.forEach((b) => {
      if (b.y >= 0 && b.y < H) grid[b.y][b.x] = ':';
    });
    grid[PLAYER_Y][s.px] = 'A';
    paint(preRef.current, grid);
  }, [W, H, PLAYER_Y]);

  const initBoard = useCallback(() => {
    const s = g.current;
    s.px = Math.floor(W / 2);
    s.lives = 3;
    s.enemies = makeEnemies();
    s.dir = 1;
    s.shots = [];
    s.bombs = [];
    s.enemyAcc = 0;
    s.enemyStep = 0.55;
    s.bulletAcc = 0;
    s.bombAcc = 0;
    s.cooldown = 0;
    s.over = false;
    s.score = 0;
    draw();
  }, [W, makeEnemies, draw]);

  const reset = useCallback(() => {
    initBoard();
    setScore(0);
    setLives(3);
    setStatus('playing');
  }, [initBoard]);

  const finish = useCallback(
    (result: 'over' | 'win') => {
      g.current.over = true;
      setStatus(result);
      playSound(result === 'win' ? 'score' : 'die');
      onResult?.(g.current.score);
    },
    [playSound, onResult]
  );

  const loseLife = useCallback(() => {
    const s = g.current;
    s.lives -= 1;
    setLives(s.lives);
    if (s.lives <= 0) finish('over');
    else playSound('die');
  }, [finish, playSound]);

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
      const s = g.current;
      if (s.over) {
        if (k === 'r') {
          e.preventDefault();
          reset();
        }
        return;
      }
      if (k === 'arrowleft' || k === 'a') {
        e.preventDefault();
        s.px = Math.max(0, s.px - 1);
      } else if (k === 'arrowright' || k === 'd') {
        e.preventDefault();
        s.px = Math.min(W - 1, s.px + 1);
      } else if (k === ' ' || k === 'spacebar') {
        e.preventDefault();
        if (s.cooldown <= 0 && s.shots.length < 3) {
          s.shots.push({ x: s.px, y: PLAYER_Y - 1 });
          s.cooldown = 0.25;
          playSound('shoot');
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit, reset, playSound, W, PLAYER_Y]);

  useRaf((dt) => {
    const s = g.current;
    if (s.over) return;
    s.cooldown = Math.max(0, s.cooldown - dt);

    s.bulletAcc += dt;
    if (s.bulletAcc >= 0.05) {
      s.bulletAcc = 0;

      const nextShots: Shot[] = [];
      for (const b of s.shots) {
        const ny = b.y - 1;
        if (ny < 0) continue;
        const hit = s.enemies.find((e) => e.alive && e.x === b.x && e.y === ny);
        if (hit) {
          hit.alive = false;
          s.score += 10;
          setScore(s.score);
          playSound('hit');
        } else {
          nextShots.push({ x: b.x, y: ny });
        }
      }
      s.shots = nextShots;

      const nextBombs: Shot[] = [];
      let bombed = false;
      for (const b of s.bombs) {
        const ny = b.y + 1;
        if (ny === PLAYER_Y && b.x === s.px) {
          bombed = true;
          continue;
        }
        if (ny < H) nextBombs.push({ x: b.x, y: ny });
      }
      s.bombs = nextBombs;
      if (bombed) loseLife();
    }

    s.enemyAcc += dt;
    if (s.enemyAcc >= s.enemyStep) {
      s.enemyAcc = 0;
      const alive = s.enemies.filter((e) => e.alive);
      if (alive.length === 0) {
        finish('win');
        return;
      }
      s.enemyStep = 0.2 + 0.45 * (alive.length / TOTAL);
      const minX = Math.min(...alive.map((e) => e.x));
      const maxX = Math.max(...alive.map((e) => e.x));
      if ((s.dir === 1 && maxX >= W - 1) || (s.dir === -1 && minX <= 0)) {
        s.dir *= -1;
        alive.forEach((e) => (e.y += 1));
      } else {
        alive.forEach((e) => (e.x += s.dir));
      }
      if (alive.some((e) => e.y >= PLAYER_Y)) {
        finish('over');
        return;
      }
    }

    s.bombAcc += dt;
    if (s.bombAcc >= 0.9) {
      s.bombAcc = 0;
      const alive = s.enemies.filter((e) => e.alive);
      if (alive.length) {
        const shooter = alive[Math.floor(Math.random() * alive.length)];
        s.bombs.push({ x: shooter.x, y: shooter.y + 1 });
      }
    }

    draw();
  });

  return (
    <GameScreen
      title="invaders"
      score={score}
      hint={
        status === 'win' ? (
          <span className="text-term-green">
            you win — R play again · ESC quit
          </span>
        ) : status === 'over' ? (
          <span className="text-term-amber">
            game over — R restart · ESC quit
          </span>
        ) : (
          <>
            ←/→ move · space fire · ESC quit · lives{' '}
            <span className="text-term-accent">{lives}</span>
          </>
        )
      }
    >
      <pre ref={preRef} className="text-term-fg leading-none" />
    </GameScreen>
  );
}
