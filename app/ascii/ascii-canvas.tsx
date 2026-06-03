'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';

import { AsciiEffect } from './ascii-effect';
import PortraitScene from './scenes/portrait';

export default function AsciiCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <color attach="background" args={['#0a0e14']} />
      <Suspense fallback={null}>
        <PortraitScene />
      </Suspense>
      <EffectComposer>
        <AsciiEffect color="#c7d0d9" columns={120} />
      </EffectComposer>
    </Canvas>
  );
}
