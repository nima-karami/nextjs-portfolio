import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  Bvh,
  Center,
  Instance,
  Instances,
  OrbitControls,
  PerformanceMonitor,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import chroma from 'chroma-js';
import { motion } from 'framer-motion';
import * as THREE from 'three';

import cn from '@/util/cn';

type Props = {
  isVisible: boolean;
};

const MovingStripesBg: React.FC<Props> = ({ isVisible }) => {
  const colors = ['black', 'navy', 'blue', 'cyan', 'white'];
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setDims({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
    console.log('containerRef dims', dims);
  }, [containerRef.current]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'h-full w-full duration-500',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ backgroundColor: colors[0] }}
    >
      {mounted && (
        <Canvas>
          <PerformanceMonitor
            onIncline={(e) => console.warn('incline', e)}
            onDecline={(e) => console.warn('decline', e)}
          />
          <Bvh firstHitOnly>
            <ambientLight intensity={3} />

            <Rectangles
              cols={400}
              rows={10}
              colors={colors}
              colorSteps={0}
              gapX={0.01}
            />

            <OrbitControls />
          </Bvh>
        </Canvas>
      )}
    </motion.div>
  );
};

export default MovingStripesBg;

type RectanglesProps = {
  cols: number;
  rows: number;
  colors: string[];
  colorSteps: number;
  gapX: number;
};

const Rectangles: React.FC<RectanglesProps> = ({
  cols,
  rows,
  colors,
  colorSteps,
  gapX,
}) => {
  const viewport = useThree((state) => state.viewport);

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
    <Center
      onCentered={({ container, height, width }) => {
        if (viewport.height > viewport.width) {
          container.scale.setScalar((viewport.width / width) * 1.5);
        } else {
          container.scale.setScalar(viewport.width / width);
        }
      }}
    >
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
    </Center>
  );
};

type RectangleProps = {
  factor: number;
  position: number[];
  color: string;
  size: number[];
};

const Rectangle: React.FC<RectangleProps> = ({
  factor,
  position,
  color,
  size,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>();
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    // oscilate up and down over time
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(factor + elapsedTime) * 0.003;
    }
  });
  return (
    <Instance
      ref={meshRef}
      color={color}
      position={new THREE.Vector3(position[0], position[1], position[2])}
      scale={new THREE.Vector3(size[0], size[1], size[2])}
    />
  );
};

// accept percentage and a value to generate jitter
const generateJitter = (value: number, percentage: number) => {
  return value + value * (Math.random() - 0.5) * percentage;
};
