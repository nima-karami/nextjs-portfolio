import React from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

const navigation = [
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white px-20 py-8 font-sans text-sm text-zinc-400 duration-500"
    >
      <div>
        <Link href="/" className="hover:text-zinc-300">
          Nima Karami
        </Link>
      </div>
      <div className="flex gap-4">
        {navigation.map((item, index) => (
          <Link key={index} href={item.href} className="hover:text-zinc-300">
            {item.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
