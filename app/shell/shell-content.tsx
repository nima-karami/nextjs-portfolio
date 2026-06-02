'use client';

import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'motion/react';

// Sequenced view transition:
//   1. old content fades out fast (the container stays at its old size),
//   2. new content mounts invisible — it still occupies space, so the
//      persistent shell's `layout` springs the EMPTY container to the new size,
//   3. once the morph has settled, the new content animates in.
// mode="wait" guarantees step 1 fully completes before step 2 begins.
const EXIT = { duration: 0.12, ease: 'easeIn' } as const;
const ENTER = { delay: 0.34, duration: 0.34, ease: 'easeOut' } as const;

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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: ENTER }}
        exit={{ opacity: 0, y: 0, transition: EXIT }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
