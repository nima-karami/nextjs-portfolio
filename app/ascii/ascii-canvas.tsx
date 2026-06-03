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
      <color attach="background" args={['#000000']} />
      <Suspense fallback={null}>
        <PortraitScene />
      </Suspense>
      <EffectComposer>
        <AsciiEffect color="#2b2926" background="#f2efe6" columns={120} />
      </EffectComposer>
    </Canvas>
  );
}
