import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';

const PortfolioPage: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 overflow-hidden px-8 pt-8 sm:px-20 sm:pb-20 sm:pt-32">
      <div className="flex w-full justify-center gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
