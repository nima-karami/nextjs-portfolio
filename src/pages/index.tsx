import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Particles from '@/components/particles';
import { Theme, useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';

const inter = Inter({ subsets: ['latin'] });

const navigation = [
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

type ThemeStyles = {
  [key in Theme]: string;
};

export default function Home() {
  const { theme } = useTheme();

  const titleStyles: ThemeStyles = {
    light: ' bg-white',
    dark: 'bg-black',
    candy: 'bg-teal-500',
  };

  const navLinkStyles: ThemeStyles = {
    light: 'text-zinc-400 hover:text-zinc-300',
    dark: 'text-zinc-800 hover:text-zinc-300',
    candy: 'text-teal-400 hover:text-zinc-300',
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden pb-12 sm:pb-0 ">
        <nav className="my-8 animate-fade-in md:my-16">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-sans text-sm duration-500 ',
                  navLinkStyles[theme]
                )}
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <h1
          className={cn(
            'text-edge-outline z-10 animate-title whitespace-nowrap bg-clip-text font-display text-5xl text-transparent duration-1000 sm:text-6xl md:text-9xl ',
            titleStyles[theme]
          )}
        >
          Nima Karami
        </h1>

        <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
        <div className="my-8 animate-fade-in text-center md:my-16">
          <h2 className="font-sans text-sm text-zinc-400">
            Full Stack Developer | UX Designer
          </h2>
        </div>
      </div>
    </>
  );
}
