import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Particles from '@/components/particles';

const inter = Inter({ subsets: ['latin'] });

const navigation = [
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden ">
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-zinc-400 duration-500 hover:text-zinc-300"
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
        <h1 className="text-edge-outline z-10 animate-title whitespace-nowrap bg-white  bg-clip-text font-display text-4xl text-transparent duration-1000 sm:text-6xl md:text-9xl ">
          Nima Karami
        </h1>

        <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
        <div className="my-16 animate-fade-in text-center">
          <h2 className="font-sans text-sm text-zinc-400">
            Full Stack Developer | UX Designer
          </h2>
        </div>
      </div>
    </>
  );
}
