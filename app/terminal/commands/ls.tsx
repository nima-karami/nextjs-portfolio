import { files } from './fs';
import type { Command } from './registry';

const ls: Command = {
  name: 'ls',
  description: 'list files',
  run: ({ print }) => {
    print(
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        {Object.keys(files).map((name) => (
          <span key={name} className="text-term-accent">
            {name}
          </span>
        ))}
      </div>
    );
  },
};

export default ls;
