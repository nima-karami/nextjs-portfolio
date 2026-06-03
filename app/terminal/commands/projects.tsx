import { projects } from '../../data/projects';
import type { Command } from './registry';

const projectsCmd: Command = {
  name: 'projects',
  description: 'selected work',
  run: ({ print }) => {
    print(
      <div className="max-w-2xl space-y-4">
        {projects.map((project) => (
          <div key={project.name}>
            <p>
              <span className="text-term-accent font-semibold">{project.name}</span>
              {project.wip && (
                <span className="text-term-amber ml-2">[WIP]</span>
              )}
            </p>
            <p className="text-term-fg">{project.description}</p>
            <p className="text-term-dim">{project.technologies.join(' · ')}</p>
          </div>
        ))}
      </div>
    );
  },
};

export default projectsCmd;
