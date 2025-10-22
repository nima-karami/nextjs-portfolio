import Card from './card';
import Container from './container';
import SectionTitle from './section-title';

type Project = {
  title: string;
  description: string;
};

const PROJECTS: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.',
  },
  {
    title: 'E-commerce Platform',
    description:
      'An online store featuring a user-friendly interface, secure payment gateway, and responsive design.',
  },
  {
    title: 'Blog Website',
    description:
      'A blog website built with Next.js, allowing users to read and comment on posts.',
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <SectionTitle
          title="Projects"
          subtitle="Here are some of the projects I've worked on recently."
        />
        <div className="flex gap-4 p-20">
          {PROJECTS.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProjectsSection;
