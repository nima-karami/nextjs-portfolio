import Container from './container';
import ExperienceCard from './experience-card';
import FadeInViewAnimation from './fade-in-view-animation';
import SectionTitle from './section-title';

export type Experience = {
  company: string;
  position: string;
  date: string;
  description: string[];
};

const EXPERIENCE: Experience[] = [
  {
    company: 'TimePlay',
    position: 'Lead Fullstack Developer & UX/UI Designer',
    date: '2022 - Present',
    description: [
      'Led a **team of 7 developers** in the successful delivery of a **monolithic web application**. Demonstrated exceptional **leadership** and **communication skills**.',

      '**Conceptualized, wireframed, and implemented** a game store from start to finish.',

      'Architected and developed a scalable monolithic React application, successfully integrating features such as **dynamic routing, state management, and performance optimization**.',
    ],
  },
  {
    company: 'Functionland',
    position: 'UX Designer & Web Developer',
    date: '2021 - 2022',
    description: [
      '**Led the design and development** of an innovative, user-friendly landing page.',
      'Directed a **team of three designers** in producing high-quality media content, ensuring consistency and impact across digital platforms.',
    ],
  },
  {
    company: 'Diamond Schmitt',
    position: 'Architect & Computational Designer',
    date: '2021 - 2022',
    description: [
      'Implemented **evolutionary algorithms** to **optimize tower placement and geometry**, enhancing urban space utilization and architectural aesthetics.',
      'Engineered an automated system for **simulating shadow impacts**, leveraging **weather data** to provide comprehensive environmental analysis.',
    ],
  },
];

function ExperienceSection() {
  return (
    <section id="experience" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <FadeInViewAnimation delay={0.1} duration={0.5}>
          <SectionTitle
            title="Experience"
            subtitle="Here's a brief overview of my professional experience:"
          />
        </FadeInViewAnimation>

        <div className="flex flex-col">
          {EXPERIENCE.map((item) => (
            <FadeInViewAnimation
              key={item.company}
              delay={0.1}
              duration={0.5}
              className="border-secondary-dark border-b last:border-0"
            >
              <ExperienceCard {...item} />
            </FadeInViewAnimation>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ExperienceSection;
