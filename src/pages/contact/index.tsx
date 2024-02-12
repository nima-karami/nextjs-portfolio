import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

import ShimmerBorderCard from '@/components/shimmer-border-card';

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
    <div className="flex h-screen w-screen items-center justify-center gap-6 overflow-hidden px-20 pb-20 pt-32">
      <div className="flex w-full justify-center gap-4">
        {contacts.map((item, index) => (
          <ShimmerBorderCard key={index} scaleOnHover>
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
  return (
    <Link
      className="text flex flex-col items-center justify-center gap-4 p-20 py-32 text-7xl"
      href={href}
      target="_blank"
    >
      <div className="flex items-center gap-4 text-slate-400">{logo}</div>
      <h1 className="relative z-10 mb-4 w-full text-center font-sans text-sm font-bold  text-slate-400">
        {title}
      </h1>
    </Link>
  );
};
