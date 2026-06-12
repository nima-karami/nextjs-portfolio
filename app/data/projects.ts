export type Project = {
  name: string;
  description: string;
  technologies: string[];
  wip?: boolean;
};

export const projects: Project[] = [
  {
    name: 'Deal or No Deal Mobile',
    description:
      'A web-based Deal or No Deal game that lets audience members join the thrill from their phones — with a chance to reach the main stage or win prizes. I designed the experience and built the frontend.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Digital Scratch Cards',
    description:
      'Three accessible, interactive digital scratch cards with custom animations, sound, authentication, and a player lobby. I led a team of seven across frontend and backend.',
    technologies: [
      'React',
      'TypeScript',
      'HeroUI',
      'Tailwind CSS',
      'Howler.js',
    ],
  },
  {
    name: 'Generation Social',
    description:
      'A playful landing page for a social media marketing agency, featuring custom animations, a distinct navbar, and an interactive socials section. I designed and built the site.',
    technologies: [
      'Figma',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
  },
  {
    name: 'Yours Ecommerce Store',
    description:
      'An interactive e-commerce store with customizable products and 3D product previews, built for a unique shopping experience. Founder and lead developer.',
    technologies: ['React', 'TypeScript', 'Three.js', 'Node.js', 'Express'],
    wip: true,
  },
];
