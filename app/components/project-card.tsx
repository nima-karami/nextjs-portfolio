'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';

import { Project } from './projects-section';

type ProjectCardProps = {
  title: Project['title'];
  description: Project['description'];
  technologies: Project['technologies'];
  thumbnail: Project['thumbnail'];
  href: Project['href'];
};

function ProjectCard({
  title,
  description,
  technologies,
  thumbnail,
  href,
}: ProjectCardProps) {
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
      className="border-secondary group relative flex h-96 w-1/3 flex-col overflow-hidden border transition duration-300 hover:border-gray-200"
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

      <div className="border-secondary relative z-10 flex grow flex-col gap-4 border-b p-4">
        <div>
          <Image
            src={thumbnail}
            alt={`${title} Thumbnail`}
            width={600}
            height={400}
            className="h-32 w-full object-cover"
          />
        </div>
        <h3 className="font-jura pb-2">{title}</h3>
      </div>
      <ul className="flex flex-wrap gap-2 p-4 text-sm">
        {technologies.map((technology, index) => (
          <li
            key={index}
            className="border-secondary flex h-6 items-center border px-2 text-xs transition duration-300 hover:border-gray-200"
          >
            {technology}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default ProjectCard;
