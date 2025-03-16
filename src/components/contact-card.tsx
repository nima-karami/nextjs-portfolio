import Link from 'next/link';

import { useTheme } from '@/contexts/theme-context';
import { Contact } from '@/data/contacts';
import cn from '@/util/cn';
import { ThemeStyles } from '@/util/types';

import ShimmerBorderCard from './shimmer-border-card';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { title, logo, href } = contact;
  const { theme } = useTheme();
  const styles: ThemeStyles = {
    light: 'text-slate-400',
    dark: 'text-neutral-300',
    candy: 'text-teal-800',
    stripes: 'text-white',
  };

  return (
    <ShimmerBorderCard scaleOnHover className="max-sm:p-6">
      <Link
        className={cn(
          'text flex h-full w-full flex-col items-center justify-center gap-2 p-20 py-0 text-5xl  sm:gap-4 sm:py-32 sm:text-7xl',
          styles[theme]
        )}
        href={href}
        target="_blank"
      >
        <div className="flex ">{logo}</div>
        <h1 className="w-full text-center font-sans text-sm font-bold ">
          {title}
        </h1>
      </Link>
    </ShimmerBorderCard>
  );
};

export default ContactCard;
