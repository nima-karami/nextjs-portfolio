import { experience } from '../../data/experience';
import { Md } from './md';
import type { Command } from './registry';

const experienceCmd: Command = {
  name: 'experience',
  description: 'work history',
  run: ({ print }) => {
    print(
      <div className="max-w-2xl space-y-4">
        {experience.map((job) => (
          <div key={job.company}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-term-accent font-semibold">{job.company}</span>
              <span className="text-term-fg">{job.position}</span>
              <span className="text-term-dim ml-auto">{job.date}</span>
            </div>
            <ul className="mt-1 space-y-0.5">
              {job.description.map((line, i) => (
                <li key={i} className="text-term-fg flex gap-2">
                  <span className="text-term-dim">-</span>
                  <span>
                    <Md>{line}</Md>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  },
};

export default experienceCmd;
