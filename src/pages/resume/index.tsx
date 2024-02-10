import React from 'react';

import { motion } from 'framer-motion';
import { FiCloudLightning } from 'react-icons/fi';

import Navbar from '@/components/navbar';

const resumeContent = [
  {
    logo: 'https://via.placeholder.com/150',
    title: 'TimePlay',
    position: 'Lead Fullstack Developer',
    date: '2022 - Present',
    description: `- Lead a team of 5 developers to build a new platform for TimePlay using React, Next.js, and TailwindCSS <br/> 
      - Built a new platform for TimePlay using React, Next.js, and TailwindCSS <br/>
      - Lead a team of 5 developers to build a new platform for TimePlay using React, Next.js, and TailwindCSS <br/>`,
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

const ResumePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 overflow-hidden bg-white">
        {resumeContent.map((content, index) => (
          <ShimmerBorderCard key={index} {...content} />
        ))}
      </div>
    </>
  );
};

export default ResumePage;

type ShimmerBorderCardProps = {
  logo: string;
  title: string;
  position: string;
  date: string;
  description: string;
};

const ShimmerBorderCard: React.FC<ShimmerBorderCardProps> = ({
  logo,
  title,
  position,
  date,
  description,
}) => {
  return (
    <div
      id="shimmer-card"
      className=" group relative mx-auto w-full max-w-xl overflow-hidden rounded-lg  p-0.5 transition-all duration-500 hover:scale-[1.01] "
    >
      <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] border border-slate-200 bg-slate-50/50 p-8 transition-colors duration-500 group-hover:bg-slate-100">
        {/* <FiCloudLightning className="relative z-10 mb-4 mt-2 rounded-full border-2 border-teal-400 bg-slate-100 p-4 text-7xl text-teal-500" /> */}

        <h1 className="relative z-10 mb-4 w-full text-center font-display text-3xl font-bold text-slate-800">
          {title}
        </h1>
        <h2 className="relative z-10  w-full text-center font-sans text-sm font-bold uppercase text-slate-800">
          {position}
        </h2>
        <h2 className="relative z-10 mb-4 w-full text-center font-sans text-sm   text-slate-400">
          {date}
        </h2>
        <p className="relative z-10 px-4 font-sans text-sm leading-6 text-slate-400">
          {description.split('<br/>').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>

      <motion.div
        initial={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        style={{ scale: 1.75 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'linear',
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-slate-200 via-slate-200/0 to-slate-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
};
