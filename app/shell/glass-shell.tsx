'use client';

import { motion, useReducedMotion } from 'motion/react';

import NavButtons from './nav-buttons';
import ShellContent from './shell-content';
import { SPRING } from './shell-motion';

// The persistent morphing glass surface. Lives in the root layout (above the
// route boundary) so it never unmounts; the `layout` prop auto-animates its
// size as the route content inside it changes height.
export default function GlassShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-0 grid place-items-center p-4">
      <motion.div
        layout
        transition={reduce ? { duration: 0 } : SPRING}
        className="glass-surface flex max-h-[88vh] w-[min(92vw,640px)] flex-col overflow-hidden"
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-8 md:p-12">
          <ShellContent>{children}</ShellContent>
        </div>
        <div className="border-glass-border shrink-0 border-t p-4">
          <NavButtons />
        </div>
      </motion.div>
    </div>
  );
}
