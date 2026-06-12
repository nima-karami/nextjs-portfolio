import { experience } from '../../data/experience';
import { Md } from './md';
import type { Command } from './registry';
import { sleep } from './reveal';

const experienceCmd: Command = {
  name: 'experience',
  description: 'work history',
  run: async ({ print }) => {
    for (const job of experience) {
      print(
        <div className="mt-3 space-y-1">
          <p>
            <span className="text-term-accent font-semibold">
              {job.company}
            </span>
            <span className="text-term-dim"> — {job.date}</span>
          </p>
          <p className="text-term-fg">{job.position}</p>
          <ul className="mt-0.5 space-y-1">
            {job.description.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-term-dim">·</span>
                <span>
                  <Md>{line}</Md>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
      await sleep(140);
    }
  },
};

export default experienceCmd;
