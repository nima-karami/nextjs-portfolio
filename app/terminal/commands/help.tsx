import type { Command } from './registry';

const help: Command = {
  name: 'help',
  description: 'list available commands',
  run: ({ print, registry }) => {
    const commands = Object.values(registry).filter((c) => !c.hidden);
    print(
      <div className="space-y-1">
        <p className="text-term-dim">
          Ask me a question — or run a command (with or without a leading{' '}
          <span className="text-term-fg">/</span>):
        </p>
        <ul className="mt-1 space-y-0.5">
          {commands.map((c) => (
            <li key={c.name} className="flex gap-3">
              <span className="text-term-accent w-28 shrink-0">/{c.name}</span>
              <span className="text-term-dim">{c.description}</span>
            </li>
          ))}
        </ul>
        <p className="text-term-dim mt-2">
          Anything that isn&apos;t a command{' '}
          <span className="text-term-fg">chats with me</span>, grounded in my
          real experience.
        </p>
        <p className="text-term-dim mt-1">
          Tips: <span className="text-term-fg">↑/↓</span> history ·{' '}
          <span className="text-term-fg">Tab</span> completes ·{' '}
          <span className="text-term-fg">Ctrl+L</span> clears
        </p>
      </div>
    );
  },
};

export default help;
