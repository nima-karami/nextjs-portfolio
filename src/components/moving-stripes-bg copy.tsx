import React, { memo, useMemo, useRef } from 'react';

import {
  Instance,
  Instances,
  OrbitControls,
  OrthographicCamera,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';

import cn from '@/util/cn';

const MovingStripesBg: React.FC = ({ isVisible }) => {
  const colors = ['black', 'navy', 'blue', 'cyan', 'white'];
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className={cn('h-full w-full ', isVisible ? 'opacity-100' : 'opacity-0')}
      style={{ backgroundColor: colors[0] }}
    >
      <Canvas>
        <ambientLight intensity={3} />
        <Rectangles
          cols={400}
          rows={10}
          colors={colors}
          colorSteps={0}
          gapX={0.01}
          gapY={0.1}
        />
        <OrbitControls />
      </Canvas>
    </motion.div>
  );
};

export default MovingStripesBg;

const Rectangles = ({ cols, rows, colors, colorSteps, gapX, gapY }) => {
  // Create an array of positions
  const rects = useMemo(() => {
    const rects: { position: number[]; color: string; size: number[] }[] = [];
    const colorScale = chroma.scale(colors);

    for (let i = 0; i < cols * rows; i++) {
      // Calculate position to evenly distribute rectangles
      const x = ((i % cols) * 2 - (cols - 1)) * gapX;
      const y =
        (Math.floor(i / cols) * 2 - (rows - 1)) * generateJitter(1, 0.3);
      const position = [x, y, generateJitter(1, 0.1)];
      let color;
      if (colorSteps) {
        color =
          colorScale.colors(colorSteps)[
            Math.floor((i / (cols * rows)) * colorSteps)
          ];
      } else {
        color = colorScale(i / (cols * rows)).hex();
      }
      const height = generateJitter(5, 3);
      const width = generateJitter(0.02, 0);
      let size = [width, height, 0.01];
      rects.push({ position, color, size });
    }
    return rects;
  }, [cols, rows]);

  return (
    <Instances limit={5000}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial transparent opacity={0.8} />
      {rects.map((rect, index) => (
        <Rectangle
          key={index}
          factor={index}
          color={rect.color}
          position={rect.position}
          size={rect.size}
        />
      ))}
    </Instances>
  );
};

const Rectangle = ({ factor, position, color, size }) => {
  const meshRef = useRef();
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    // oscilate up and down over time
    meshRef.current.position.y += Math.sin(factor + elapsedTime) * 0.003;
  });
  return (
    <Instance ref={meshRef} color={color} position={position} scale={size} />
  );
};

// accept percentage and a value to generate jitter
const generateJitter = (value: number, percentage: number) => {
  return value + value * (Math.random() - 0.5) * percentage;
};
