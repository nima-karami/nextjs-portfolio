import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';

import Logo from './logo';
import ShimmerBorderCard from './shimmer-border-card';

const navigation = [
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

const styles = {
  light: 'text-slate-500 hover:text-slate-700 hover:font-bold',
  dark: 'text-neutral-400 hover:text-neutral-100 hover:font-bold',
  candy: 'text-teal-400 hover:text-zinc-300 hover:font-bold',
  stripes: 'text-neutral-300 hover:text-blue-600 hover:font-bold',
};

const activeStyles = {
  light: 'font-bold text-slate-700',
  dark: 'font-bold text-neutral-300',
  candy: 'font-bold text-teal-300',
  stripes: 'font-bold text-white',
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const { theme } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-8 font-sans text-sm text-zinc-400 duration-500 sm:px-20"
    >
      <ShimmerBorderCard className="px-6 py-4">
        <div className="flex w-full justify-between">
          <Link href="/" aria-label="Home">
            <Logo className="" />
          </Link>
          <div className="flex items-center gap-4">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  ' cursor-none transition-all duration-500',
                  styles[theme],
                  pathname === item.href ? activeStyles[theme] : ''
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </ShimmerBorderCard>
    </motion.nav>
  );
};

export default Navbar;
