import Container from './container';
import ProcessCard from './process-card';
import SectionTitle from './section-title';

export type ProcessStep = {
  title: string;
  description: string;
  deliverables: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: '01 | Discover',
    description:
      'We start with a short strategy call to define your goals, audience, and success metrics. This is where I get clarity on what we’re building and why. You’ll walk away with a clear scope, timeline, and shared project plan.',
    deliverables: 'Project brief, timeline, and Notion board.',
  },
  {
    title: '02 | Design-in-Browser',
    description:
      'Instead of static mockups, I design live in the browser. You’ll see real interactions, motion, and layout as they come to life fast. Feedback happens in real time so we can iterate quickly without bottlenecks.',
    deliverables: 'Interactive prototype, layout, and motion direction.',
  },
  {
    title: '03 | Build',
    description:
      'Once the direction’s locked, I develop a production-ready build using Next.js, Tailwind CSS, and Framer Motion. Every component is tuned for performance, accessibility, and SEO. Because speed and experience both matter.',
    deliverables: 'Fully responsive site, optimized for Core Web Vitals.',
  },
  {
    title: '04 | Review & Refine',
    description:
      'We walk through the live version together and fine-tune everything, animations, copy, and flow. You get two structured revision rounds to make sure the final product looks and feels right.',
    deliverables: 'Final review sessions, refinements, and approval.',
  },
  {
    title: '05 | Launch & Support',
    description:
      'When it’s ready, I handle the deployment, analytics, and final SEO checks. Your site goes live confidently, fast, secure, and ready to scale. After launch, I’m available for ongoing improvements or a monthly retainer if you want continuous support.',
    deliverables:
      'Vercel deployment, SEO & analytics setup, 14-day post-launch support.',
  },
];

function ProcessSection() {
  return (
    <section id="process" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <SectionTitle
          title="Process"
          subtitle="Here's a brief overview of my development process."
        />

        <div className="flex flex-col">
          {PROCESS_STEPS.map((step) => (
            <ProcessCard key={step.title} {...step} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;
