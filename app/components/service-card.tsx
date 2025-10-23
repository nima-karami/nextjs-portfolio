'use client';

import { useRef, useState } from 'react';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';

import { Service } from './services-section';

type ServiceCardProps = Service;

function ServiceCard({
  title,
  summary,
  featureBullets,
  price,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springConfig = { damping: 25, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(200, 200, 200, 0.2), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="border-secondary group relative flex h-96 w-1/3 flex-col overflow-hidden border shadow-white/40 transition duration-300 hover:border-gray-200"
    >
      {/* Glowing background effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="border-secondary relative z-10 flex h-32 flex-col border-b p-4">
        <h3 className="font-jura pb-2">{title}</h3>
        <p className="text-sm text-gray-400">{summary}</p>
      </div>
      <ul className="relative z-10 grow list-inside list-disc p-4 text-sm">
        {featureBullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
      <p className="relative z-10 p-4 font-bold">Starting at {price}</p>
    </motion.div>
  );
}

export default ServiceCard;
