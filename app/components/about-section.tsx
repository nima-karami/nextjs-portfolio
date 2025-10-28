import Markdown from 'markdown-to-jsx';

import Container from './container';
import FadeInViewAnimation from './fade-in-view-animation';
import SectionTitle from './section-title';
import SoftSkillItem from './soft-skill-item';

export type SoftSkill = {
  skill: string;
  level: 1 | 2 | 3 | 4 | 5;
};

export type TechnicalSkills = {
  frontend: string[];
  backend: string[];
  design: string[];
  other: string[];
};

type About = {
  description: string;
  softSkills: SoftSkill[];
  technicalSkills: TechnicalSkills;
};

const ABOUT: About = {
  description: `I'm **Nima Karami**, a full-stack developer based in Toronto with a background in architecture and design. I build web experiences that are fast, visually polished, and simple to use. My work focuses on **React**, **Next.js**, **Tailwind CSS**, and **Framer Motion**, combining creative design with reliable engineering.

I currently lead front-end development at **TimePlay**, where I focus on performance, accessibility, and user experience. Over the years I've helped design systems, mentored developers, and shipped production-grade applications for large audiences.

Before becoming a developer, I studied architecture, which shaped how I think about structure, balance, and human experience. That training influences how I approach interfaces today. My goal is always to make technology feel intentional, functional, and enjoyable.

Outside of work, I like exploring **interaction design**, **algorithmic trading**, and new ideas that connect design with technology.`,
  softSkills: [
    {
      skill: 'Leadership',
      level: 5,
    },
    {
      skill: 'Problem-Solving',
      level: 5,
    },
    { skill: 'Communication', level: 5 },
  ],
  technicalSkills: {
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    design: ['Figma', 'Photoshop', 'Rhinoceros 3D'],
    other: ['Git', 'Vercel', 'Docker', 'Jest'],
  },
};

function AboutSection() {
  return (
    <section id="about" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <FadeInViewAnimation delay={0.1} duration={0.5}>
          <SectionTitle
            title="About Me"
            subtitle="Here's a brief overview of my background and skills."
          />
        </FadeInViewAnimation>

        <FadeInViewAnimation delay={0.2} duration={0.5}>
          <div className="border-secondary-dark flex flex-col gap-4 border-b p-8 text-gray-200 md:p-16">
            <Markdown
              options={{
                overrides: {
                  p: {
                    props: {
                      className: 'pb-4 last:pb-0',
                    },
                  },
                },
              }}
            >
              {ABOUT.description}
            </Markdown>
          </div>
        </FadeInViewAnimation>

        <div className="flex flex-col md:flex-row">
          {/* Soft Skills */}
          <FadeInViewAnimation delay={0.3} duration={0.5} className="md:w-1/2">
            <div className="border-secondary-dark flex w-full flex-col gap-4 border-b p-8 text-gray-200 md:border-r md:border-b-0 md:p-16">
              <h3 className="font-jura text-xl font-light">Soft Skills</h3>
              <ul className="">
                {ABOUT.softSkills.map((skillItem, index) => (
                  <li key={index} className="pb-2">
                    <SoftSkillItem
                      skill={skillItem.skill}
                      level={skillItem.level}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </FadeInViewAnimation>

          {/* Technical Skills */}
          <FadeInViewAnimation delay={0.4} duration={0.5} className="md:w-1/2">
            <div className="flex w-full flex-col gap-4 p-8 text-gray-200 md:p-16">
              <h3 className="font-jura text-xl font-light">Technical Skills</h3>
              <ul className="">
                <li>
                  <strong>Frontend:</strong>{' '}
                  {ABOUT.technicalSkills.frontend.join(', ')}
                </li>
                <li>
                  <strong>Backend:</strong>{' '}
                  {ABOUT.technicalSkills.backend.join(', ')}
                </li>
                <li>
                  <strong>Design:</strong>{' '}
                  {ABOUT.technicalSkills.design.join(', ')}
                </li>
                <li>
                  <strong>Other:</strong>{' '}
                  {ABOUT.technicalSkills.other.join(', ')}
                </li>
              </ul>
            </div>
          </FadeInViewAnimation>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
