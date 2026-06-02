'use client';

import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'motion/react';

import { contentVariants } from './shell-motion';

// Cross-fades the active route's content, keyed on the URL. mode="wait" holds
// the new content until the old has exited, so the surface morphs on a settled
// box before the new content staggers in.
export default function ShellContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={contentVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
