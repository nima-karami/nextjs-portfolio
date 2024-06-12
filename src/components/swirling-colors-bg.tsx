import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const SwirlingColorsBg = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default SwirlingColorsBg;
