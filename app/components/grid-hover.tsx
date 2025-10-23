'use client';

import React, { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 25;
const FADE_DELAY = 100; // Time in ms before fade starts
const GRID_LINE_COLOR = '#222222'; // border-neutral-900
const GRID_LINE_WIDTH = 1;
const ACTIVE_CELL_COLOR = 'rgba(34, 34, 34, {opacity})'; // indigo-400
const ANIMATION_SPEED = 0.1;
const MIN_OPACITY_THRESHOLD = 0.01;

function GridHover() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridConfig, setGridConfig] = useState({
    columns: 0,
    rows: 0,
    cellSize: CELL_SIZE,
  });
  const activeSquares = useRef<
    Map<
      string,
      { opacity: number; targetOpacity: number; lastHoverTime: number }
    >
  >(new Map());
  const animationFrameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const columns = Math.ceil(width / CELL_SIZE);
      const rows = Math.ceil(height / CELL_SIZE);

      setGridConfig({ columns, rows, cellSize: CELL_SIZE });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { columns, rows, cellSize } = gridConfig;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = GRID_LINE_COLOR;
      ctx.lineWidth = GRID_LINE_WIDTH;

      for (let x = 0; x <= columns; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, 0);
        ctx.lineTo(x * cellSize, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellSize);
        ctx.lineTo(canvas.width, y * cellSize);
        ctx.stroke();
      }

      // Draw active squares
      const now = Date.now();
      activeSquares.current.forEach((square, key) => {
        const [col, row] = key.split('-').map(Number);

        // Check if it's time to start fading
        if (now - square.lastHoverTime > FADE_DELAY) {
          square.targetOpacity = 0;
        }

        // Animate opacity
        const diff = square.targetOpacity - square.opacity;
        if (Math.abs(diff) > MIN_OPACITY_THRESHOLD) {
          square.opacity += diff * ANIMATION_SPEED;
        } else {
          square.opacity = square.targetOpacity;
        }

        if (square.opacity > MIN_OPACITY_THRESHOLD) {
          ctx.fillStyle = ACTIVE_CELL_COLOR.replace(
            '{opacity}',
            square.opacity.toString()
          );
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        } else if (square.targetOpacity === 0) {
          activeSquares.current.delete(key);
        }
      });

      animationFrameId.current = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gridConfig]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / gridConfig.cellSize);
    const row = Math.floor(y / gridConfig.cellSize);

    if (
      col >= 0 &&
      col < gridConfig.columns &&
      row >= 0 &&
      row < gridConfig.rows
    ) {
      const key = `${col}-${row}`;
      const now = Date.now();

      if (!activeSquares.current.has(key)) {
        activeSquares.current.set(key, {
          opacity: 0,
          targetOpacity: 1,
          lastHoverTime: now,
        });
      } else {
        const square = activeSquares.current.get(key)!;
        square.targetOpacity = 1;
        square.lastHoverTime = now;
      }
    }
  };

  const handleMouseLeave = () => {
    activeSquares.current.forEach((square) => {
      square.targetOpacity = 0;
    });
  };

  return (
    <div className="h-full w-full">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full w-full"
      />
    </div>
  );
}

export default GridHover;
