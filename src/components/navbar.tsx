import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import Logo from './logo';
import ShimmerBorderCard from './shimmer-border-card';

const navigation = [
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-20 py-8 font-sans text-sm text-zinc-400 duration-500"
    >
      <ShimmerBorderCard className="px-6 py-4">
        <div className="flex w-full justify-between">
          <Link href="/">
            <Logo className="fill-slate-400" />
          </Link>
          <div className="flex items-center gap-4">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={clsx(
                  ' hover:text-zinc-300',
                  pathname === item.href
                    ? 'font-bold text-zinc-300'
                    : 'text-zinc-400'
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