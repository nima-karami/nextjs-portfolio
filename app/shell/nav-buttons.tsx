'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import cn from '../util/cn';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' },
];

export default function NavButtons() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2">
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'font-jura rounded-full px-4 py-2 text-sm tracking-wide uppercase transition',
              'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              active
                ? 'bg-accent text-white shadow'
                : 'glass-panel text-ink-soft hover:text-ink'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
