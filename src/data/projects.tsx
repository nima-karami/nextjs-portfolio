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
    thumbnail: '/images/deal-or-no-deal-mobile-thumbnail.jpg',
    description:
      'A web-based deal or no deal game designed to let audience members join the thrill of the famous Deal or No Deal game right from their phones. You could even get a chance to join the main stage or win exciting prizes! My role involved designing the user experience and interface, as well as developing the frontend of the application.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: 'https://placehold.co/600x400',
    videoUrl: '/videos/deal-or-no-deal-mobile.webm',
    href: '/portfolio/deal-or-no-deal-mobile',
  },
  {
    id: 'digital-scratch-cards',
    title: 'Digital Scratch Cards',
    thumbnail: '/images/digital-scratch-cards-thumbnail.jpg',
    description:
      'Three accessible and interactive digital scratch cards built with React, Tailwind CSS, and HeroUI. This project features unique animations, sounds, user authentication, and a custom user lobby. My contribution involved leading a team of seven developers to implement the frontend and backend of the application.',
    technologies: [
      'React',
      'Typescript',
      'HeroUI',
      'Tailwind CSS',
      'Framer Motion',
      'Howler.js',
    ],
    imageUrl: 'https://placehold.co/600x400',
    videoUrl: '/videos/digital-scratch-cards.webm',
    href: '/portfolio/digital-scratch-cards',
  },
  {
    id: 'generation-social',
    title: 'Generation Social',
    thumbnail: '/images/generation-social-thumbnail.jpg',
    description:
      'A modern landing page designed and built for a social media marketing agency. Features a unique and playful take with custom animations, distinct navbar, and an interactive socials section. My role included designing the user experience and interface, along with frontend development of the website.',
    technologies: [
      'Figma',
      'Next.js',
      'Typescript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    imageUrl: 'https://placehold.co/600x400',
    videoUrl: '/videos/generation-social.webm',
    href: '/portfolio/generation-social',
  },
  {
    id: 'yours-ecommerce-store',
    title: 'Yours Ecommerce Store (WIP)',
    thumbnail: '/images/yours-ecommerce-store-thumbnail.jpg',
    description:
      'An interactive e-commerce store with customizable products and 3d product previews. This project intends to provide a unique shopping experience for customers. As the founder and lead developer, I am responsible for the design and development of the entire application.',
    technologies: [
      'React',
      'Typescript',
      'Three.js',
      'Tailwind CSS',
      'Framer Motion',
      'Node.js',
      'Express',
    ],
    imageUrl: 'https://placehold.co/600x400',
    videoUrl: '/videos/yours-ecommerce-store.webm',
    href: '/portfolio/yours-ecommerce-store',
  },
];
