import ProjectCard from '@/components/project-card';
import { projects } from '@/data/projects';

const PortfolioPage: React.FC = () => {
  return (
    <div className="flex h-full w-full justify-center gap-6 overflow-y-auto px-8 pb-20 pt-32 pt-8 sm:px-20">
      <div className="grid w-full items-center justify-center gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
