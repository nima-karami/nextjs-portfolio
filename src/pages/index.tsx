import Link from 'next/link';

import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';
import { ThemeStyles } from '@/util/types';

const navigation = [
  { name: 'Resume', href: '/resume' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  const { theme } = useTheme();

  const titleStyles: ThemeStyles = {
    light: 'bg-slate-50',
    dark: 'bg-neutral-900',
    candy: 'bg-teal-500',
    stripes: 'bg-white',
  };

  const navLinkStyles: ThemeStyles = {
    light: 'text-slate-500 hover:text-slate-700 hover:font-bold',
    dark: 'text-neutral-400 hover:text-neutral-800 hover:font-bold',
    candy: 'text-teal-400 hover:text-zinc-300 hover:font-bold',
    stripes: 'text-white hover:text-slate-700 hover:font-bold',
  };

  const subTitleStyles: ThemeStyles = {
    light: 'text-slate-500',
    dark: 'text-zinc-400',
    candy: 'text-teal-400',
    stripes: 'text-white',
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden pb-12 sm:pb-0 ">
      <nav className="my-8 animate-fade-in px-2 md:my-16">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'font-sans text-sm duration-500 ',
                  navLinkStyles[theme]
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

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
        <h2
          className={cn(
            'font-sans text-sm text-zinc-400',
            subTitleStyles[theme]
          )}
        >
          Lead Full-stack Developer | UX Designer
        </h2>
      </div>
    </div>
  );
}
