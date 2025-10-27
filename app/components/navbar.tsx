'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AnimatePresence, motion } from 'motion/react';

import LottieButton from './animated-hamburger-button';
import AnimatedHamburgerButton from './animated-hamburger-button';
import Container from './container';

const NAV_ITEMS = [
  { href: '#experience', label: 'experience' },
  { href: '#about', label: 'about' },
  { href: '#contact', label: 'contact' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="border-secondary relative border-b">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="border-secondary hover:bg-secondary flex h-full items-center border-r px-4 transition duration-300"
        >
          <Image
            src="/images/logo-white.png"
            alt="Logo"
            width={64}
            height={32}
            className="inline-block"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden h-full md:flex">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <AnimatedHamburgerButton
          isMenuOpen={isMenuOpen}
          onClick={toggleMenu}
          className="absolute right-4 z-51 h-12 w-12 hover:cursor-pointer md:hidden"
        />
      </Container>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div className="flex h-full flex-col bg-black">
              {/* Mobile Nav Items */}
              <ul className="flex flex-1 flex-col items-center justify-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="font-jura text-3xl text-gray-200 transition duration-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

type NavItemProps = {
  href: string;
  label: string;
};

function NavItem({ href, label }: NavItemProps) {
  return (
    <li className="hover:bg-secondary h-full w-32 transition duration-300">
      <Link
        href={href}
        className="border-secondary font-jura flex h-full items-center justify-center border-l px-4 text-gray-200"
      >
        {label}
      </Link>
    </li>
  );
}
