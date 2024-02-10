import { motion } from 'framer-motion';

import ShimmerBorderCard from '@/components/shimmer-border-card';

const experience = [
  {
    logo: 'https://via.placeholder.com/150',
    title: 'TimePlay',
    position: 'Lead Fullstack Developer',
    date: '2022 - Present',
    description: `- Lead a team of 5 developers to build a new platform for TimePlay using React, Next.js, and TailwindCSS <br/> 
      - Built a new platform for TimePlay using React, Next.js, and TailwindCSS <br/>
      - Lead a team of 5 developers to build a new platform for TimePlay using React, Next.js, and TailwindCSS`,
  },
  {
    logo: 'https://via.placeholder.com/150',
    title: 'Functionland',
    position: 'Web Developer | UX Designer',
    date: '2022 - Present',
    description:
      'Lead a team of 5 developers to build a new platform for TimePlay using React, Next.js, and TailwindCSS',
  },
  {
    logo: 'https://via.placeholder.com/150',
    title: 'Diamond Schmitt',
    position: 'Architect | Computational Designer',
    date: '2022 - Present',
    description:
      'Lead a team of 5 developers to build a new platform for TimePlay using React, Next.js, and TailwindCSS',
  },
];

const education = [
  {
    logo: 'https://via.placeholder.com/150',
    location: 'University of Waterloo',
    degree: 'Master of Architecture',
    description:
      'Lead a team of 5 developers to build a new platform for TimePlay using React, Next.js, and TailwindCSS',
  },
];

const aboutMe = {
  logo: 'https://via.placeholder.com/150',
  description: `I am a full-stack developer and UX designer with a passion for creating beautiful and functional web applications. I have experience working with a wide range of technologies and frameworks, and I am always looking to learn new things and improve my skills. I am a creative problem solver with a keen eye for detail, and I am always looking for new and exciting projects to work on.`,
};

const technologies = [
  'React',
  'Next.js',
  'TailwindCSS',
  'Node.js',
  'Express',
  'MongoDB',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'After Effects',
  'Premiere Pro',
  'Blender',
  'Unity',
  'Unreal Engine',
];

const skills = [
  { name: 'Leadership', level: 4 },
  { name: 'Frontend Development', level: 5 },
  { name: 'Backend Development', level: 4 },
  { name: 'UX Design', level: 4 },
  { name: '3D Modeling', level: 4 },
];

const ResumePage: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-6 overflow-hidden px-20 pt-32">
      <div className="flex justify-center gap-4">
        <div className="flex w-1/2 flex-col gap-4">
          <ShimmerBorderCard scaleOnHover>
            <h1 className="relative z-10 mb-4 w-full font-display text-5xl font-bold text-slate-400">
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
          <ShimmerBorderCard scaleOnHover>
            {education.map((item, index) => (
              <>
                <h1 className="relative z-10 mb-4 w-full  font-display text-5xl font-bold text-slate-400">
                  Education
                </h1>
                <CardContent
                  key={index}
                  title={item.location}
                  subtitle={item.degree}
                  description={item.description}
                />
              </>
            ))}
          </ShimmerBorderCard>
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          <ShimmerBorderCard scaleOnHover>
            <h1 className="relative z-10 mb-4 w-full  font-display text-5xl font-bold text-slate-400">
              About me
            </h1>
            <CardContent description={aboutMe.description} />
          </ShimmerBorderCard>
          <ShimmerBorderCard scaleOnHover>
            <h1 className="relative z-10 mb-4 w-full  font-display text-5xl font-bold text-slate-400">
              Skills
            </h1>
            <div className="flex w-full flex-col gap-2">
              {skills.map((item, index) => (
                <div
                  key={index}
                  className="items-between flex w-full justify-between gap-4"
                >
                  <h2 className="font-sans text-sm font-bold uppercase text-slate-800">
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
            <h1 className="relative z-10 mb-4 w-full  font-display text-5xl font-bold text-slate-400">
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
  description?: string;
};

const CardContent: React.FC<CardContentProps> = ({
  title,
  subtitle,
  date,
  description,
}) => {
  return (
    <div className="flex flex-col">
      {title && (
        <h1 className="font-display text-xl font-bold text-slate-800">
          {title}
        </h1>
      )}
      {subtitle && (
        <h2 className="font-sans text-sm font-bold uppercase text-slate-800">
          {subtitle}
        </h2>
      )}
      {date && <h2 className="font-sans text-sm text-slate-400">{date}</h2>}
      {description && (
        <p className="mb-6 mt-2 font-sans text-sm leading-6 text-slate-400">
          {/* break description on <br/> */}
          {description.split('<br/>').map((item, index) => (
            <>
              {item}
              <br />
            </>
          ))}
        </p>
      )}
    </div>
  );
};
