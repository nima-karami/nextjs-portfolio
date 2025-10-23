import Container from './container';
import SectionTitle from './section-title';

function AboutSection() {
  return (
    <section id="about" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <SectionTitle
          title="About Me"
          subtitle="Here's a brief overview of my background and skills."
        />

        <div className="border-secondary-dark flex flex-col gap-4 border-b p-16 text-gray-200">
          <p>
            I’m <strong>Nima Karami</strong>, a full-stack developer based in
            Toronto with a background in architecture and design. I build web
            experiences that are fast, visually polished, and simple to use. My
            work focuses on <strong>React</strong>, <strong>Next.js</strong>,{' '}
            <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>,
            combining creative design with reliable engineering.
          </p>
          <p>
            I currently lead front-end development at <strong>TimePlay</strong>,
            where I focus on performance, accessibility, and user experience.
            Over the years I’ve helped design systems, mentor developers, and
            ship production-grade applications for large audiences.
          </p>
          <p>
            Before becoming a developer, I studied architecture, which shaped
            how I think about structure, balance, and human experience. That
            training influences how I approach interfaces today. My goal is
            always to make technology feel intentional, functional, and
            enjoyable.
          </p>
          <p>
            Outside of work, I like exploring{' '}
            <strong>interaction design</strong>,{' '}
            <strong>algorithmic trading</strong>, and new ideas that connect
            design with technology.
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-4 p-16 text-gray-200">
          <h3 className="font-jura text-xl font-light">Core Skills</h3>
          <ul className="">
            <li>
              <strong>Frontend:</strong> React, Next.js (App Router),
              TypeScript, Tailwind CSS, Framer Motion
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Express, PostgreSQL, Prisma,
              Supabase
            </li>
            <li>
              <strong>Design:</strong> UX/UI, accessibility (WCAG), responsive
              systems, motion design
            </li>
            <li>
              <strong>Other:</strong> Git, Vercel, Docker, Jest, CI/CD,
              mentoring, system architecture
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
