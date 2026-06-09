import { technicalSkills } from '../../data/skills';
import type { Command } from './registry';

const groups: [string, readonly string[]][] = [
  ['engineering', technicalSkills.engineering],
  ['product & ai', technicalSkills.productAi],
  ['practice', technicalSkills.practice],
];

const skillsCmd: Command = {
  name: 'skills',
  description: 'engineering, product & AI, practice',
  run: ({ print }) => {
    print(
      <div className="max-w-2xl space-y-1">
        {groups.map(([label, items]) => (
          <p key={label} className="flex gap-3">
            <span className="text-term-accent w-28 shrink-0">{label}</span>
            <span className="text-term-fg">{items.join(', ')}</span>
          </p>
        ))}
      </div>
    );
  },
};

export default skillsCmd;
