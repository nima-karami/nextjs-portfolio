import type { Transition, Variants } from 'motion/react';

// The spring that drives the glass surface morph between views.
export const SPRING: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

// Wraps a view's content: fades the group, then staggers its children in
// slightly after the container has begun settling.
export const contentVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.12, staggerChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Per-child pop-in. Children opt in by being motion.* with variants={popIn}.
export const popIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
};
