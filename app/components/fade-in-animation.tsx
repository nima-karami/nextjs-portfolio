'use client';

import { motion } from 'motion/react';

import cn from '../util/cn';

type FadeInAnimationProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export default function FadeInAnimation({
  children,
  delay = 0,
  duration = 0.3,
  className,
}: FadeInAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration }}
      className={cn('h-full w-full', className)}
    >
      {children}
    </motion.div>
  );
}
