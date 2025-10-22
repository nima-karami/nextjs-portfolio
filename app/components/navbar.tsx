import Image from 'next/image';
import Link from 'next/link';

import Container from './container';

const NAV_ITEMS = [
  { href: '#about', label: 'about' },
  { href: '#projects', label: 'projects' },
  { href: '#contact', label: 'contact' },
];

function Navbar() {
  return (
    <nav className="border-secondary border-b">
      <Container className="flex h-20 items-center justify-between">
        <div className="border-secondary flex h-full items-center border-r px-4">
          <Image
            src="/images/logo-white.png"
            alt="Logo"
            width={64}
            height={32}
            className="inline-block"
          />
        </div>
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
    <li className="border-secondary hover:bg-secondary h-full w-20 border-l px-4">
      <Link
        href={href}
        className="flex h-full items-center justify-center text-gray-200"
      >
        {label}
      </Link>
    </li>
  );
}
