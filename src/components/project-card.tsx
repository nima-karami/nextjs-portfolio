import Image from 'next/image';
import Link from 'next/link';

import ShimmerBorderCard from '@/components/shimmer-border-card';
import { useTheme } from '@/contexts/theme-context';
import { Project } from '@/data/projects';
import cn from '@/util/cn';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useTheme();
  return (
    <ShimmerBorderCard scaleOnHover className="h-full">
      <Link href={project.href} className="block h-full w-full">
        <div className="flex h-full flex-col p-2">
          <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2 text-2xl">
            <h2 className="font-display font-bold transition-colors duration-500">
              {project.title}
            </h2>
          </div>
          <p className="mt-2 line-clamp-3 font-sans text-sm transition-colors duration-500">
            {project.description}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    'rounded-full px-2 py-1 font-sans text-xs',
                    theme === 'light' && 'bg-slate-200 text-slate-900',
                    theme === 'dark' && 'bg-gray-800',
                    theme === 'stripes' && 'bg-blue-100'
                  )}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span
                  className={cn(
                    'rounded-full px-2 py-1 font-sans text-xs',
                    theme === 'light' && 'bg-slate-200 text-slate-900',
                    theme === 'dark' && 'bg-gray-800',
                    theme === 'stripes' && 'bg-blue-100'
                  )}
                >
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </ShimmerBorderCard>
  );
};

export default ProjectCard;
