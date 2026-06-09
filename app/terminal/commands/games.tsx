import type { Command } from './registry';

const LIST: [string, string][] = [
  ['snake', 'eat, grow, avoid yourself'],
  ['invaders', 'shoot the descending fleet'],
  ['pong', 'paddle vs the machine'],
];

const games: Command = {
  name: 'games',
  description: 'retro games — type one to play',
  run: ({ print }) => {
    print(
      <div className="space-y-1">
        <p className="text-term-dim">a few games I grew up with — type one to play:</p>
        <ul className="mt-1 space-y-0.5">
          {LIST.map(([name, desc]) => (
            <li key={name} className="flex gap-3">
              <span className="text-term-accent w-24 shrink-0">{name}</span>
              <span className="text-term-dim">{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};

export default games;
