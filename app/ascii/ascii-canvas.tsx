'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';

import { AsciiEffect } from './ascii-effect';
import TorusScene from './scenes/torus';

export default function AsciiCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <color attach="background" args={['#0a0e14']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} />
      <TorusScene />
      <EffectComposer>
        <AsciiEffect />
      </EffectComposer>
    </Canvas>
  );
}
