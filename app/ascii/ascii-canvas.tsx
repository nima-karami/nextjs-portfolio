'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Suspense, type ComponentType } from 'react';

import type { SceneName } from '../shell/types';
import { AsciiEffect } from './ascii-effect';
import PortraitScene from './scenes/portrait';
import TorusScene from './scenes/torus';

const SCENES: Partial<Record<SceneName, ComponentType>> = {
  portrait: PortraitScene,
  torus: TorusScene,
};

export default function AsciiCanvas({ scene = 'portrait' }: { scene?: SceneName }) {
  const Scene = SCENES[scene] ?? PortraitScene;
  // The torus needs lighting; the unlit portrait ignores it harmlessly.
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <color attach="background" args={['#0a0e14']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <EffectComposer>
        <AsciiEffect color="#c7d0d9" columns={120} />
      </EffectComposer>
    </Canvas>
  );
}
