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
    position: 'Lead Fullstack Developer | Product Engineer',
    date: '2022 - Present',
    description: [
      'Spearheaded the development of fully **accessible mobile web applications**, adhering to **WCAG 2.0 standards** and delivering seamless user experiences with **React**, **Typescript**, **WebSocket**, and **Tailwind CSS**. Leveraged **Framer Motion** to ensure smooth interactions and transitions, showcasing a meticulous **attention to detail** and commitment to **user satisfaction**.',
      '**Directed a proficient team of developers** in the successful delivery of multiple web applications. Demonstrated exceptional **leadership and communication skills**, fostering a collaborative environment conducive to achieving project milestones and exceeding client expectations.',
      'Exhibited expertise in **full-stack development**, seamlessly integrating front-end and back-end technologies such as **Typescript**, **React.js**, **Next.js**, **Node.js**, **MongoDB**, **Docker**, and more. Applied adept problem-solving abilities to overcome technical and design challenges, ensuring the **robustness** and **scalability** of software solutions.',
    ],
  },
  {
    logo: 'https://via.placeholder.com/150',
    title: 'Functionland',
    position: 'Web Developer | UX Designer',
    date: '2021 - 2022',
    description: [
      'Collaborated with business and marketing teams to align website design with strategic objectives, enhancing value creation. Performed **agile-based** front-end maintenance to improve website **functionality** and **user engagement**.',
      '**Led the design and development** of an innovative, user-friendly landing page, incorporating dynamic card components and a responsive carousel using **Svelte, JavaScript, HTML5, and CSS3**',
      '**Directed a team of three designers** in producing high-quality media content, ensuring consistency and impact across digital platforms. **Reviewed design mockups** for technical feasibility and optimization, ensuring effective presentation on both mobile and desktop environments',
    ],
  },
  {
    logo: 'https://via.placeholder.com/150',
    title: 'Diamond Schmitt',
    position: 'Architect | Computational Designer',
    date: '2021 - 2022',
    description: [
      'Implemented **evolutionary algorithms** to **optimize tower placement and geometry**, enhancing urban space utilization and architectural aesthetics.',
      'Engineered an automated system for **simulating shadow impacts**, leveraging **weather data** to provide comprehensive environmental analysis.',
      'Developed an innovative algorithm focused on **maximizing daylight access** and **minimizing heat loss**, contributing to **energy efficiency in high-rise residential buildings**.',
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
  description: `**Lead Full-Stack Product Engineer** based in Toronto, Canada, combining expertise in **web development**, **product design**, and **architecture**. With a **Master of Architecture** from the **University of Waterloo**, I build **scalable**, **user-centric** digital products. Skilled in **JavaScript**, **TypeScript**, **React**, **Next.js**, and **Node.js**, I specialize in intuitive interfaces and technical solutions, **leading cross-functional teams** to deliver **accessible**, **high-quality** software.`,
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
