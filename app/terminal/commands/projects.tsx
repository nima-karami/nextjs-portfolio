import { projects } from '../../data/projects';
import { sleep } from './reveal';
import type { Command } from './registry';

const projectsCmd: Command = {
  name: 'projects',
  description: 'selected work',
  run: async ({ print }) => {
    for (const project of projects) {
      print(
        <div className="mt-3 max-w-[64ch] space-y-0.5">
          <p>
            <span className="text-term-accent font-semibold">{project.name}</span>
            {project.wip && <span className="text-term-amber ml-2">[WIP]</span>}
          </p>
          <p className="text-term-fg">{project.description}</p>
          <p className="text-term-dim">{project.technologies.join(' · ')}</p>
        </div>
      );
      await sleep(140);
    }
  },
};

export default projectsCmd;
