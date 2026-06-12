'use client';

import { type ComponentType, Suspense } from 'react';

import { Canvas, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';

import { useShell } from '../shell/shell-context';
import { ASCII_COLORS } from '../shell/themes';
import type { SceneName } from '../shell/types';
import { AsciiEffect } from './ascii-effect';
import PortraitScene from './scenes/portrait';
import SkullScene from './scenes/skull';
import TorusScene from './scenes/torus';

// The R3F scenes. `matrix` is intentionally absent: it's a 2D-canvas effect
// (matrix-rain.tsx), not an R3F scene, so right-panel.tsx renders it directly.
const SCENES: Partial<Record<SceneName, ComponentType>> = {
  portrait: PortraitScene,
  torus: TorusScene,
  skull: SkullScene,
};

// CSS px per ASCII cell — tuned so the glyphs read at ~the terminal's character
// size, so the whole UI feels like one terminal (not tiny dots).
const TARGET_CELL = 16;

function AsciiPass({
  themeKey,
  ink,
  bg,
}: {
  themeKey: string;
  ink: string;
  bg: string;
}) {
  // R3F `size` is the canvas CSS size. Derive columns so each cell stays
  // ~TARGET_CELL css px regardless of panel size (stepped to limit rebuilds).
  const width = useThree((s) => s.size.width);
  const columns = Math.max(
    40,
    Math.min(160, Math.round(width / TARGET_CELL / 4) * 4)
  );
  return (
    <EffectComposer key={`${themeKey}:${columns}`}>
      <AsciiEffect color={ink} background={bg} columns={columns} />
    </EffectComposer>
  );
}

export default function AsciiCanvas({
  scene = 'portrait',
}: {
  scene?: SceneName;
}) {
  const { theme } = useShell();
  const Scene = SCENES[scene] ?? PortraitScene;
  const c = ASCII_COLORS[theme];
  // Scene background stays dark so empty cells map to the "space" glyph (= panel
  // bg). Flat symmetric lighting so a 3D object's whole silhouette renders.
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 2, 4]} intensity={1.0} />
      <directionalLight position={[-2, 2, 4]} intensity={1.0} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <AsciiPass themeKey={theme} ink={c.ink} bg={c.bg} />
    </Canvas>
  );
}
