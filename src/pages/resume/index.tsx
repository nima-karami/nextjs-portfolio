import { motion } from 'framer-motion';
import Markdown from 'markdown-to-jsx';

import ShimmerBorderCard from '@/components/shimmer-border-card';
import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';
import { ThemeStyles } from '@/util/types';

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
    degree: 'MArch',
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
  dark: 'text-neutral-300',
  candy: 'text-teal-500',
  stripes: 'text-neutral-300',
};

const h2Styles = {
  light: 'text-slate-600',
  dark: 'text-neutral-50',
  candy: 'text-teal-400',
  stripes: 'text-neutral-300',
};

const descriptionStyles: ThemeStyles = {
  light: 'text-slate-400',
  dark: 'text-neutral-100',
  candy: 'text-teal-500',
  stripes: 'text-neutral-300',
};

const tagsStyles = {
  light: 'text-slate-600 hover:bg-white hover:text-slate-800',
  dark: 'text-neutral-300 hover:bg-white hover:text-slate-800',
  candy:
    'text-teal-300 bg-teal-800 border-teal-900 hover:bg-white hover:text-teal-800',
  stripes: ' border hover:bg-white hover:text-blue-600',
};

const barStyles = {
  light: 'bg-slate-300',
  dark: 'bg-neutral-400',
  candy: 'bg-teal-500',
  stripes: 'bg-blue-300',
};

const ResumePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex h-full w-full gap-6 overflow-y-auto px-8 sm:px-20 md:pt-12 lg:pt-16">
      <div className="mt-32 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <ShimmerBorderCard scaleOnHover>
            <CardTitle title="Experience" />
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
        <div className="flex flex-col gap-4 max-lg:pb-28">
          <ShimmerBorderCard scaleOnHover>
            <CardTitle title="About Me" />
            <p className={cn('font-sans text-sm', descriptionStyles[theme])}>
              <Markdown>{aboutMe.description}</Markdown>
            </p>
          </ShimmerBorderCard>
          <ShimmerBorderCard scaleOnHover>
            <CardTitle title="Skills" />
            <div className="flex w-full flex-col gap-2">
              {skills.map((item, index) => (
                <div
                  key={index}
                  className="items-between flex w-full justify-between gap-4"
                >
                  <h2
                    className={cn(
                      'font-sans text-xs font-bold  uppercase sm:text-sm',
                      h2Styles[theme]
                    )}
                  >
                    {item.name}
                  </h2>
                  <div className="h-4 w-24 flex-shrink-0 rounded-full bg-slate-200 sm:w-40">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level * 20}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className={cn('h-full rounded-full', barStyles[theme])}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ShimmerBorderCard>
          <ShimmerBorderCard scaleOnHover>
            <CardTitle title="Technologies" />
            <div className="flex flex-wrap gap-2">
              {technologies.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'border-grey text-xstransition-colors rounded-full border-2 px-4 py-2 font-sans duration-500  sm:text-sm',
                    tagsStyles[theme]
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </ShimmerBorderCard>
          <ShimmerBorderCard scaleOnHover className="">
            <div className="flex h-full w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-12">
              <CardTitle title="Education" className="mb-0 w-auto" />
              <div className="">
                <h2
                  className={cn(
                    'text-center font-sans text-sm font-bold uppercase ',
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
        <h2
          className={cn(
            'text-md font-sans font-bold sm:text-lg',
            h2Styles[theme]
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <h2
          className={cn(
            'font-sans text-xs font-bold uppercase sm:text-sm',
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
        <ul
          className={cn(
            'mb-4 mt-2 list-inside list-disc font-sans text-sm',
            descriptionStyles[theme]
          )}
        >
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

type CardTitleProps = {
  title: string;
  className?: string;
};

const CardTitle: React.FC<CardTitleProps> = ({ title, className = '' }) => {
  const { theme } = useTheme();

  const styles: ThemeStyles = {
    light: 'text-slate-400',
    dark: 'text-neutral-200',
    candy: 'text-teal-500',
  };

  return (
    <h1
      className={cn(
        'mb-4 w-full font-display text-4xl font-bold md:text-5xl ',
        styles[theme],
        className
      )}
    >
      {title}
    </h1>
  );
};
