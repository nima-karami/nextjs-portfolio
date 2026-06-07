import type { Command } from './registry';

const pong: Command = {
  name: 'pong',
  description: 'play pong vs the machine',
  run: ({ shell, print }) => {
    shell.setStage({ kind: 'game', game: 'pong' });
    print(
      <span className="text-term-dim">
        launching pong — ↑/↓ or W/S, first to 7, ESC to quit ↗
      </span>
    );
  },
};

export default pong;
