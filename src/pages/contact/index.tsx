import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

import ShimmerBorderCard from '@/components/shimmer-border-card';
import { ThemeStyles } from '@/util/types';

const contacts = [
  {
    title: 'Github',
    logo: <FaGithub />,
    href: 'https://github.com/nima-karami',
  },
  {
    title: 'LinkedIn',
    logo: <FaLinkedin />,
    href: 'https://www.linkedin.com/in/nima-karami/',
  },
  {
    title: 'Email',
    logo: <FaEnvelope />,
    href: 'mailto:nkarami.dev@gmail.com',
  },
];

const ContactPage: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 overflow-hidden px-8 pt-8 sm:px-20 sm:pb-20 sm:pt-32">
      <div className="flex w-full justify-center gap-4">
        {contacts.map((item, index) => (
          <ShimmerBorderCard key={index} scaleOnHover className="max-sm:p-6">
            <CardContent title={item.title} logo={item.logo} href={item.href} />
          </ShimmerBorderCard>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;

type CardContentProps = {
  logo?: React.ReactNode;
  title?: string;
  href: Url;
};

const CardContent: React.FC<CardContentProps> = ({ logo, title, href }) => {
  const styles: ThemeStyles = {
    light: 'border-white',
    dark: 'border-black',
    candy: 'border-teal-500',
  };

  return (
    <Link
      className="text flex flex-col items-center justify-center gap-2 p-20 py-0 text-5xl sm:gap-4 sm:py-32 sm:text-7xl"
      href={href}
      target="_blank"
    >
      <div className="flex text-slate-400">{logo}</div>
      <h1 className="w-full text-center font-sans text-sm font-bold  text-slate-400">
        {title}
      </h1>
    </Link>
  );
};
