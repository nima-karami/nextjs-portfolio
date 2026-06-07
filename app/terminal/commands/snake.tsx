import type { Command } from './registry';

const snake: Command = {
  name: 'snake',
  description: 'play snake',
  run: ({ shell, print }) => {
    shell.setStage({ kind: 'game', game: 'snake' });
    print(
      <span className="text-term-dim">
        launching snake — arrows / WASD, ESC to quit ↗
      </span>
    );
  },
};

export default snake;
