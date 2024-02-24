import React, { useMemo, useRef } from 'react';

import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import chroma from 'chroma-js';

import MovingStripesBg from '@/components/moving-stripes-bg';

const TestPage: React.FC = () => {
  return <MovingStripesBg isVisible={true} />;
};

export default TestPage;
