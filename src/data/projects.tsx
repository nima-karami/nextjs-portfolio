export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  href: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'deal-or-no-deal-mobile',
    title: 'Deal or No Deal Mobile',
    thumbnail: 'https://placehold.co/600x400',
    description:
      'A modern portfolio built with Next.js and Tailwind CSS featuring smooth animations and a custom theme system.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: 'https://placehold.co/600x400',
    href: '/portfolio/deal-or-no-deal-mobile',
    demoUrl: 'https://www.example.com',
    githubUrl: 'https://github.com/nima-karami/nextjs-portfolio',
  },
  {
    id: 'digital-scratch-cards',
    title: 'Digital Scratch Cards',
    thumbnail: 'https://placehold.co/600x400',
    description:
      'An interactive dashboard application with data visualization and real-time updates.',
    technologies: ['React', 'Redux', 'D3.js', 'Material UI'],
    imageUrl: 'https://placehold.co/600x400',
    href: '/portfolio/digital-scratch-cards',
    demoUrl: 'https://www.example.com/dashboard',
    githubUrl: 'https://github.com/nima-karami/react-dashboard',
  },
  {
    id: 'generation-social',
    title: 'Generation Social',
    thumbnail: 'https://placehold.co/600x400',
    description:
      'A RESTful API built with Node.js, Express, and MongoDB with authentication and authorization.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    imageUrl: 'https://placehold.co/600x400',
    href: '/portfolio/generation-social',
    githubUrl: 'https://github.com/nima-karami/node-api',
  },
  {
    id: 'yours-ecommerce-store',
    title: 'Yours Ecommerce Store',
    thumbnail: 'https://placehold.co/600x400',
    description:
      'A RESTful API built with Node.js, Express, and MongoDB with authentication and authorization.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    imageUrl: 'https://placehold.co/600x400',
    href: '/portfolio/yours-ecommerce-store',
    githubUrl: 'https://github.com/nima-karami/node-api',
  },
];
