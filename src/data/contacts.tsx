import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

export interface Contact {
  title: string;
  logo: JSX.Element;
  href: string;
}

export const contacts: Contact[] = [
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
