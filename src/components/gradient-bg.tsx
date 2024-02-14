import { useState } from 'react';

import { motion } from 'framer-motion';

export default function GradientBg() {
  const [mode, _] = useState(0);
  const shapes = [
    'M1336.91,451.19s-92,264-440,102.67-497.33-280-616-238.67S10.24,469.85.91,425.85,144.91,37.85,318.24,4.52s316,149.33,414.67,228c98.67,78.67,357.33-168,534.1-122.17,52.22,13.54,101.9,110.17,69.9,340.83Z',
    'M146.08,116.87C192.48,73.71,222.69,11.12,277.73,1.41c55.03-9.71,102.51,61.51,189.92,79.85,87.41,18.34,201.79,25.9,285.96-5.4s221.22-84.17,319.41-56.11c98.2,28.06,180.21,89.82,230.93,118.83,50.72,29.01,102.51,136.92,20.5,204.9s-112.23-116.37-161.87-171.49c-49.64-55.12-113.31-91.81-168.34-20.59-55.03,71.22-128.41,180.21-201.79,214.74-73.38,34.53-309.7,91.72-385.24-18.34-75.54-110.07-118.7-306.46-224.45-131.65-33.24,54.94-93.88,233.09-144.6,131.65C-12.55,246.36-8.24,117.95,28.45,135.21c36.69,17.27,71.22,24.82,117.62-18.34Z',
    'M.5,399.35C.5,244.69,176.5-7.31,679.17.69s664,256,664,386.67c0,237.33-434.67-61.33-658.67-61.33S.5,554.02.5,399.35Z',
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1367.88 412.62"
      preserveAspectRatio="none"
      className=""
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="black" />
          <stop offset="100%" stopColor="#f6f6f6" />
        </linearGradient>
        <filter id="blurEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
        </filter>
      </defs>

      {mode === 0 &&
        Array.from({ length: 3 }).map((_, i) => (
          <motion.path
            key={i}
            d={shapes[1]}
            className="fill-slate-300 blur-2xl"
            style={{ scale: 1.5 }}
            initial={{ x: 0, y: i * 400 - 400 }}
            animate={{ x: [400, 0, 400], y: [400, 0, 400] }}
            transition={{
              duration: 10,
              delay: i * 3,
              repeat: Infinity,
            }}
          />
        ))}
    </motion.svg>
  );
}
