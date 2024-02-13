import { useRef, useState } from 'react';

import {
  GradientTexture,
  GradientType,
  MeshDistortMaterial,
  useCursor,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Flag() {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame(() => {
    ref.current.distort = THREE.MathUtils.lerp(ref.current.distort, 0.9, 1);
  });
  return (
    <mesh
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      scale={[10, 10, 1]}
    >
      <planeGeometry args={[1, 1, 100, 100]} />
      <MeshDistortMaterial ref={ref} speed={1}>
        <GradientTexture
          stops={[0, 1]}
          colors={['#bdc3c7', '#2c3e50']}
          size={10}
          type={GradientType.Radial}
        />
      </MeshDistortMaterial>
    </mesh>
  );
}

export default function BackgroundGradient() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />
      <Flag />
    </Canvas>
  );
}
