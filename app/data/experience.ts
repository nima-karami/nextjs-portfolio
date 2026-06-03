export type Experience = {
  company: string;
  position: string;
  date: string;
  description: string[];
};

export const experience: Experience[] = [
  {
    company: 'TimePlay',
    position: 'Lead Fullstack Developer & UX/UI Designer',
    date: '2022 - Present',
    description: [
      'Led a **team of 7 developers** in the successful delivery of a **monolithic web application**.',
      '**Conceptualized, wireframed, and implemented** a game store from start to finish.',
      'Architected a scalable React application with **dynamic routing, state management, and performance optimization**.',
    ],
  },
  {
    company: 'Functionland',
    position: 'UX Designer & Web Developer',
    date: '2021 - 2022',
    description: [
      '**Led the design and development** of an innovative, user-friendly landing page.',
      'Directed a **team of three designers** in producing high-quality media content across digital platforms.',
    ],
  },
  {
    company: 'Diamond Schmitt',
    position: 'Architect & Computational Designer',
    date: '2021 - 2022',
    description: [
      'Implemented **evolutionary algorithms** to **optimize tower placement and geometry**.',
      'Engineered an automated system for **simulating shadow impacts** using **weather data**.',
    ],
  },
];
