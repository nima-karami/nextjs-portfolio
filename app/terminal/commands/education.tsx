import { education } from '../../data/education';
import type { Command } from './registry';

const educationCmd: Command = {
  name: 'education',
  description: 'degrees & schools',
  run: ({ print }) => {
    print(
      <div className="space-y-2">
        {education.map((e) => (
          <div key={e.school}>
            <p className="text-term-accent font-semibold">{e.degree}</p>
            <p className="text-term-fg">
              {e.school}
              <span className="text-term-dim"> · {e.date}</span>
            </p>
          </div>
        ))}
      </div>
    );
  },
};

export default educationCmd;
