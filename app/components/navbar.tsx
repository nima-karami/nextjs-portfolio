import Image from 'next/image';
import Link from 'next/link';

import Container from './container';

const NAV_ITEMS = [
  { href: '#experience', label: 'experience' },
  { href: '#about', label: 'about' },
  { href: '#contact', label: 'contact' },
];

function Navbar() {
  return (
    <nav className="border-secondary border-b">
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
        <ul className="flex h-full">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </ul>
      </Container>
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
