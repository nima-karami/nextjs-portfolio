'use client';

import { useRef } from 'react';

import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import type { Mesh } from 'three';

// The headshot on a viewport-filling plane (cover). Unlit so the photo's own
// values drive the ASCII ramp. Subtle breathing zoom + drift keeps it alive
// without a full spin — the "editorial portrait" motion.
export default function PortraitScene() {
  const texture = useTexture('/images/headshot.jpg');
  const mesh = useRef<Mesh>(null);
  const viewport = useThree((s) => s.viewport);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;

    const img = texture.image as { width: number; height: number } | undefined;
    const imgAspect = img ? img.width / img.height : 1;
    const vpAspect = viewport.width / viewport.height;

    // Cover: fill the panel, cropping the overflowing axis.
    let w = viewport.width;
    let h = viewport.height;
    if (vpAspect > imgAspect) h = w / imgAspect;
    else w = h * imgAspect;

    const t = state.clock.elapsedTime;
    const breathe = 1.04 + Math.sin(t * 0.25) * 0.025;
    m.scale.set(w * breathe, h * breathe, 1);
    m.position.x = Math.sin(t * 0.15) * 0.05;
    m.position.y = Math.cos(t * 0.2) * 0.04;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
