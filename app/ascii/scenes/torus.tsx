'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

// Ambient scene: a slowly tumbling torus knot. White material so lighting
// produces the full luminance range the ASCII ramp needs.
export default function TorusScene() {
  const ref = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.4;
    ref.current.rotation.y += dt * 0.55;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.32, 160, 32]} />
      <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.05} />
    </mesh>
  );
}
