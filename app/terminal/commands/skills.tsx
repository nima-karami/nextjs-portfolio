import { softSkills, technicalSkills } from '../../data/skills';
import type { Command } from './registry';

const groups: [string, readonly string[]][] = [
  ['frontend', technicalSkills.frontend],
  ['backend', technicalSkills.backend],
  ['design', technicalSkills.design],
  ['other', technicalSkills.other],
];

const skillsCmd: Command = {
  name: 'skills',
  description: 'technical & soft skills',
  run: ({ print }) => {
    print(
      <div className="max-w-2xl space-y-1">
        {groups.map(([label, items]) => (
          <p key={label} className="flex gap-3">
            <span className="text-term-accent w-20 shrink-0">{label}</span>
            <span className="text-term-fg">{items.join(', ')}</span>
          </p>
        ))}
        <p className="flex gap-3">
          <span className="text-term-accent w-20 shrink-0">soft</span>
          <span className="text-term-fg">{softSkills.join(', ')}</span>
        </p>
      </div>
    );
  },
};

export default skillsCmd;
