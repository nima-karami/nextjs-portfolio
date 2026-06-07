'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Box3, Vector3, type Group } from 'three';

// CC0 skull (Kay Lousberg, poly.pizza). Centered + scaled via a WRAPPER group
// (so the model's own transforms are preserved), then slowly rotated. Rendered
// through the ASCII post pass.
export default function SkullScene() {
  const { scene } = useGLTF('/models/skull.glb');
  const ref = useRef<Group>(null);

  const { scale, position } = useMemo(() => {
    scene.updateWorldMatrix(true, true);
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 1.7 / maxDim;
    return {
      scale: s,
      position: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
    };
  }, [scene]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.6;
  });

  return (
    <group ref={ref}>
      <group scale={scale} position={position}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/skull.glb');
