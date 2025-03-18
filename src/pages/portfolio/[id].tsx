import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import ShimmerBorderCard from '@/components/shimmer-border-card';
import { useTheme } from '@/contexts/theme-context';
import { Project, projects } from '@/data/projects';
import cn from '@/util/cn';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const router = useRouter();
  const { theme } = useTheme();
  if (router.isFallback) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  return (
    <div className=" w-full overflow-hidden px-8 py-12 sm:px-20 sm:pb-24 md:pt-32 lg:pt-40">
      <ShimmerBorderCard
        className="h-full justify-start overflow-y-auto p-8"
        classNames={{ wrapper: 'h-full ' }}
      >
        <div className="flex max-w-4xl flex-col items-center ">
          <Link
            href="/portfolio"
            className={cn(
              'mb-8 flex items-center gap-2 text-sm transition-colors duration-500',
              theme === 'light' && 'text-slate-400 hover:text-slate-600',
              theme === 'dark' && 'text-neutral-300 hover:text-neutral-100',
              theme === 'stripes' && 'text-white hover:text-blue-600'
            )}
          >
            <FaArrowLeft size={12} />
            Back to Portfolio
          </Link>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h1 className={cn('font-display text-3xl font-bold')}>
                {project.title}
              </h1>
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </div>

          <div className="mb-8 shrink-0 overflow-hidden rounded-xl">
            <video
              className="w-full"
              controls
              poster={project.thumbnail}
              preload="metadata"
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 font-display text-xl font-bold">Description</h2>
            <p className="font-sans ">{project.description}</p>
          </div>

          <div className="flex w-full flex-col">
            <h2 className="mb-4 font-display text-xl font-bold">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    'rounded-full px-3 py-1 font-sans text-base transition-all duration-500',
                    theme === 'light' &&
                      'bg-slate-200 text-slate-900 hover:bg-slate-900 hover:text-slate-200',
                    theme === 'dark' &&
                      'border border-white bg-transparent hover:bg-white hover:text-slate-800',
                    theme === 'stripes' &&
                      'border border-white bg-transparent hover:bg-white hover:text-blue-600'
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ShimmerBorderCard>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all projects
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));

  return {
    paths,
    fallback: false, // Show 404 for non-existent projects
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Find the project with matching id
  const project = projects.find((p) => p.id === params?.id);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
};

export default ProjectDetail;
