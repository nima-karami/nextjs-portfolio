import { Fragment } from 'react';

import { motion } from 'framer-motion';
import Markdown from 'markdown-to-jsx';

import ShimmerBorderCard from '@/components/shimmer-border-card';
import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';

const experience = [
  {
    logo: 'https://via.placeholder.com/150',
    title: 'TimePlay',
    position: 'Lead Fullstack Developer',
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

const education = [
  {
    logo: 'https://via.placeholder.com/150',
    location: 'University of Waterloo',
    degree: 'Master of Architecture',
  },
];

const aboutMe = {
  logo: 'https://via.placeholder.com/150',
  description: `**Lead Fullstack Developer** based in **Toronto, Canada**, with a unique blend of engineering and design expertise stemming from a **Master of Architecture** degree from the **University of Waterloo**. Leveraging a diverse skill set honed through architectural innovation and hobbyist coding projects, I possess strong **communication**, **critical thinking**, and **problem-solving** abilities. From utilizing machine learning to craft emotion-aware architecture to automating video games and backtesting trading strategies, I bring **creativity** and **technical proficiency** to every project I undertake.`,
};

const technologies = [
  'Typescript',
  'Javascript',
  'React',
  'Next.js',
  'Svelte',
  'Framer Motion',
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

const skills = [
  { name: 'Leadership', level: 5 },
  { name: 'Frontend Development', level: 5 },
  { name: 'Backend Development', level: 4 },
  { name: 'UX Design', level: 4 },
  { name: '3D Modeling', level: 4 },
];

const h1Styles = {
  light: 'text-slate-400',
  dark: 'text-slate-300',
  candy: 'text-teal-500',
};

const h2Styles = {
  light: 'text-slate-600',
  dark: 'text-slate-500',
  candy: 'text-teal-400',
};

const ResumePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-6 overflow-hidden px-20 pb-20 pt-32">
      <div className="flex justify-center gap-4">
        <div className="flex w-1/2 flex-col gap-4">
          <ShimmerBorderCard scaleOnHover>
            <h1
              className={cn(
                'mb-4 w-full font-display text-5xl font-bold ',
                h1Styles[theme]
              )}
            >
              Experience
            </h1>
            {experience.map((item, index) => (
              <CardContent
                key={index}
                title={item.title}
                subtitle={item.position}
                date={item.date}
                description={item.description}
              />
            ))}
          </ShimmerBorderCard>
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          <ShimmerBorderCard scaleOnHover>
            <h1
              className={cn(
                'mb-4 w-full font-display text-5xl font-bold ',
                h1Styles[theme]
              )}
            >
              About me
            </h1>
            <p className="font-sans text-sm text-slate-400">
              <Markdown>{aboutMe.description}</Markdown>
            </p>
          </ShimmerBorderCard>
          <ShimmerBorderCard scaleOnHover>
            <h1
              className={cn(
                'mb-4 w-full font-display text-5xl font-bold ',
                h1Styles[theme]
              )}
            >
              Skills
            </h1>
            <div className="flex w-full flex-col gap-2">
              {skills.map((item, index) => (
                <div
                  key={index}
                  className="items-between flex w-full justify-between gap-4"
                >
                  <h2
                    className={cn(
                      'font-sans text-sm font-bold uppercase',
                      h2Styles[theme]
                    )}
                  >
                    {item.name}
                  </h2>
                  <div className="h-4 w-40 rounded-full bg-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level * 20}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-full rounded-full bg-teal-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </ShimmerBorderCard>
          <ShimmerBorderCard scaleOnHover>
            <h1
              className={cn(
                'mb-4 w-full font-display text-5xl font-bold ',
                h1Styles[theme]
              )}
            >
              Technologies
            </h1>
            <div className="flex flex-wrap gap-2">
              {technologies.map((item, index) => (
                <div
                  key={index}
                  className="border-grey rounded-full border-2 px-4 py-2 text-sm text-slate-400 transition-colors duration-500 hover:bg-white hover:text-slate-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </ShimmerBorderCard>
          <ShimmerBorderCard scaleOnHover className="">
            <div className="flex h-full w-full items-center justify-between">
              <h1
                className={cn(
                  'font-display text-5xl font-bold ',
                  h1Styles[theme]
                )}
              >
                Education
              </h1>
              <div>
                <h2
                  className={cn(
                    'font-sans text-sm font-bold uppercase ',
                    h2Styles[theme]
                  )}
                >
                  {education[0].degree} | {education[0].location}
                </h2>
              </div>
            </div>
          </ShimmerBorderCard>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;

type CardContentProps = {
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string[];
};

const CardContent: React.FC<CardContentProps> = ({
  title,
  subtitle,
  date,
  description,
}) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col">
      {title && (
        <h2 className={cn('font-sans text-lg font-bold', h2Styles[theme])}>
          {title}
        </h2>
      )}
      {subtitle && (
        <h2
          className={cn(
            'font-sans text-sm font-bold uppercase',
            h2Styles[theme]
          )}
        >
          {subtitle}
        </h2>
      )}
      {date && (
        <h3 className={cn('font-sans text-sm ', h1Styles[theme])}>{date}</h3>
      )}
      {description && (
        <ul className="mb-4 mt-2 list-inside list-disc font-sans text-sm text-slate-400">
          {description.map((item, index) => (
            <li key={index}>
              <Markdown>{item}</Markdown>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
