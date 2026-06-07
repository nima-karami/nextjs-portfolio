'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Suspense, type ComponentType } from 'react';

import { useShell } from '../shell/shell-context';
import { ASCII_COLORS } from '../shell/themes';
import type { SceneName } from '../shell/types';
import { AsciiEffect } from './ascii-effect';
import PortraitScene from './scenes/portrait';
import SkullScene from './scenes/skull';
import TorusScene from './scenes/torus';

const SCENES: Partial<Record<SceneName, ComponentType>> = {
  portrait: PortraitScene,
  torus: TorusScene,
  skull: SkullScene,
};

export default function AsciiCanvas({ scene = 'portrait' }: { scene?: SceneName }) {
  const { theme } = useShell();
  const Scene = SCENES[scene] ?? PortraitScene;
  const c = ASCII_COLORS[theme];
  // The torus needs lighting; the unlit portrait ignores it harmlessly. Scene
  // background stays dark so empty cells map to the "space" glyph (= panel bg).
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <color attach="background" args={['#000000']} />
      {/* Flat, symmetric front lighting so a 3D object's whole silhouette
          renders evenly as glyphs (not just the lit side). */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 2, 4]} intensity={1.0} />
      <directionalLight position={[-2, 2, 4]} intensity={1.0} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      {/* key on theme so the effect rebuilds with new ink/bg uniforms */}
      <EffectComposer key={theme}>
        <AsciiEffect color={c.ink} background={c.bg} columns={120} />
      </EffectComposer>
    </Canvas>
  );
}
