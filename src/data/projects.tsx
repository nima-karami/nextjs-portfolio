export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  videoUrl: string;
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
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    href: '/portfolio/deal-or-no-deal-mobile',
    demoUrl: 'https://www.example.com',
    githubUrl: 'https://github.com/nima-karami/nextjs-portfolio',
  },
  {
    id: 'digital-scratch-cards',
    title: 'Digital Scratch Cards',
    thumbnail: 'https://placehold.co/600x400',
    description:
      'Three accessible and interactive digital scratch cards built with React, Tailwind CSS, and HeroUI. This project features unique animations, sounds, user authentication, and a custom user lobby.',
    technologies: [
      'React',
      'HeroUI',
      'Tailwind CSS',
      'Framer Motion',
      'Howler.js',
    ],
    imageUrl: 'https://placehold.co/600x400',
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    href: '/portfolio/digital-scratch-cards',
    demoUrl: 'https://www.example.com/dashboard',
    githubUrl: 'https://github.com/nima-karami/react-dashboard',
  },
  {
    id: 'generation-social',
    title: 'Generation Social',
    thumbnail: '/images/generation-social-thumbnail.jpg',
    description:
      'A modern landing page designed and built for a social media marketing agency. Features a unique and playful take with custom animations, distinct navbar, and an interactive socials section.',
    technologies: ['Figma', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: 'https://placehold.co/600x400',
    videoUrl: '/videos/generation-social.mp4',
    href: '/portfolio/generation-social',
  },
  {
    id: 'yours-ecommerce-store',
    title: 'Yours Ecommerce Store',
    thumbnail: 'https://placehold.co/600x400',
    description:
      'An interactive e-commerce store with customizable products and 3d product previews. This project intends to provide a unique shopping experience for customers.',
    technologies: [
      'React',
      'Three.js',
      'Tailwind CSS',
      'Framer Motion',
      'Node.js',
      'Express',
    ],
    imageUrl: 'https://placehold.co/600x400',
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    href: '/portfolio/yours-ecommerce-store',
    githubUrl: 'https://github.com/nima-karami/node-api',
  },
];
