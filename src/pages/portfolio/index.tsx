import ProjectCard from '@/components/project-card';
import ScrollShadow from '@/components/scroll-shadow';
import { projects } from '@/data/projects';

const PortfolioPage: React.FC = () => {
  return (
    <div className="flex h-full w-full justify-center gap-6 overflow-hidden px-8 pb-28 pt-28 sm:px-20 sm:pb-20  sm:pt-32">
      <div className="grid w-full items-center justify-center gap-4 overflow-y-auto md:grid-cols-2 xl:grid-cols-4 xl:items-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
