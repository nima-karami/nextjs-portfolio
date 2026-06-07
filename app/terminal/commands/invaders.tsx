import type { Command } from './registry';

const invaders: Command = {
  name: 'invaders',
  description: 'play space invaders',
  run: ({ shell, print }) => {
    shell.setStage({ kind: 'game', game: 'invaders' });
    print(
      <span className="text-term-dim">
        launching invaders — ←/→ move, space to fire, ESC to quit ↗
      </span>
    );
  },
};

export default invaders;
