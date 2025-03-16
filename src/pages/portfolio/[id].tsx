import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import { Project, projects } from '@/data/projects';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:pt-32 lg:pt-32">
      <Link
        href="/portfolio"
        className="mb-8 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <FaArrowLeft size={12} />
        Back to Portfolio
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{project.title}</h1>
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

      <div className="relative mb-8 h-96 w-full overflow-hidden rounded-xl">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Description</h2>
        <p className="text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
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
