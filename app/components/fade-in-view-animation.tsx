'use client';

import { motion } from 'motion/react';

import cn from '../util/cn';

type FadeInViewAnimationProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
};

export default function FadeInViewAnimation({
  children,
  delay = 0,
  duration = 0.5,
  once = false,
  className,
}: FadeInViewAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        margin: '-100px',
        once,
      }}
      transition={{ delay, duration }}
      className={cn('h-full w-full', className)}
    >
      {children}
    </motion.div>
  );
}
