import React, { useMemo, useRef } from 'react';

import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';

const MovingStripesBg: React.FC = () => {
  const colors = ['black', 'navy', 'blue', 'cyan', 'white'];
  return (
    <motion.div
      className="h-full w-full"
      style={{ backgroundColor: colors[1] }}
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

  // Refs to store a reference to each mesh
  const meshRefs = useRef([]);
  meshRefs.current = rects.map(
    (_, i) => meshRefs.current[i] ?? React.createRef()
  );

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    // Loop through each ref and update properties
    meshRefs.current.forEach((ref, index) => {
      if (ref.current) {
        // oscilate up and down over time
        ref.current.position.y += Math.sin(elapsedTime + index) * 0.005;
      }
    });
  });

  return (
    <>
      {rects.map((rect, index) => (
        <mesh
          key={index}
          ref={meshRefs.current[index]}
          position={rect.position}
        >
          <boxGeometry args={rect.size} />
          {/* Adjust rectangle size as needed */}
          <meshStandardMaterial color={rect.color} transparent opacity={0.7} />
        </mesh>
      ))}
    </>
  );
};

// accept percentage and a value to generate jitter
const generateJitter = (value: number, percentage: number) => {
  return value + value * (Math.random() - 0.5) * percentage;
};
