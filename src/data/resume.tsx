export interface Experience {
  logo: string;
  title: string;
  position: string;
  date: string;
  description: string[];
}

export const experience: Experience[] = [
  {
    logo: 'https://via.placeholder.com/150',
    title: 'TimePlay',
    position: 'Lead Fullstack Developer & Product Designer',
    date: '2022 - Present',
    description: [
      'Led a **team of 7 developers** in the successful delivery of a **monolithic web application**. Demonstrated exceptional **leadership** and **communication skills**.',

      '**Conceptualized, wireframed, and implemented** a game store from start to finish.',

      'Architected and developed a scalable monolithic React application, successfully integrating features such as **dynamic routing, state management, and performance optimization**.',
    ],
  },
  {
    logo: 'https://via.placeholder.com/150',
    title: 'Functionland',
    position: 'UX Designer & Web Developer',
    date: '2021 - 2022',
    description: [
      '**Led the design and development** of an innovative, user-friendly landing page.',
      'Directed a **team of three designers** in producing high-quality media content, ensuring consistency and impact across digital platforms.',
    ],
  },
  {
    logo: 'https://via.placeholder.com/150',
    title: 'Diamond Schmitt',
    position: 'Architect & Computational Designer',
    date: '2021 - 2022',
    description: [
      'Implemented **evolutionary algorithms** to **optimize tower placement and geometry**, enhancing urban space utilization and architectural aesthetics.',
      'Engineered an automated system for **simulating shadow impacts**, leveraging **weather data** to provide comprehensive environmental analysis.',
    ],
  },
];

export interface Education {
  logo: string;
  location: string;
  degree: string;
}

export const education: Education[] = [
  {
    logo: 'https://via.placeholder.com/150',
    location: 'University of Waterloo',
    degree: 'MArch',
  },
];

export interface AboutMe {
  logo: string;
  description: string;
}

export const aboutMe: AboutMe = {
  logo: 'https://via.placeholder.com/150',
  description: `Self-driven **Lead Fullstack Developer and Product Designer** with a background in architecture, specializing in crafting **user-centric digital experiences** from **concept to launch**. Skilled in **UX/UI design, frontend development, and product strategy**, I autonomously lead **cross-functional projects**, design engaging user experiences, and deliver high-quality, scalable software used by thousands`,
};

export type Technology = string;

export const technologies: Technology[] = [
  'Typescript',
  'Javascript',
  'React',
  'Next.js',
  'Motion',
  'HeroUI',
  'Jest',
  'D3.js',
  'Three.js',
  'WebSocket',
  'Docker',
  'Rest API',
  'TailwindCSS',
  'Node.js',
  'Express',
  'MongoDB',
  'Figma',
  'Photoshop',
  'Illustrator',
  'Rhinoceros 3D',
];

export interface Skill {
  name: string;
  level: number;
}

export const skills: Skill[] = [
  { name: 'Leadership', level: 5 },
  { name: 'Frontend Development', level: 5 },
  { name: 'Backend Development', level: 4 },
  { name: 'UX Design', level: 4 },
  { name: '3D Modeling', level: 4 },
];
