import type { Command } from './registry';

const COFFEE = String.raw`        ) )
       ( (
     ..........
     |        |]
     \        /
      '------'`;

// Hidden commands — discoverable by the curious. Not listed in help.
export const easterEggs: Command[] = [
  {
    name: 'sudo',
    description: 'superuser do',
    hidden: true,
    run: ({ print }) => {
      print(
        <span className="text-term-red">
          visitor is not in the sudoers file. This incident will be reported. 🚓
        </span>
      );
    },
  },
  {
    name: 'vim',
    description: 'how do I exit this thing?',
    hidden: true,
    run: ({ print }) => {
      print(
        <span className="text-term-dim">
          trapped in vim? press <span className="text-term-accent">ESC</span>, type{' '}
          <span className="text-term-accent">:q!</span> and hit enter. you&apos;re welcome.
        </span>
      );
    },
  },
  {
    name: 'exit',
    description: 'there is no exit',
    hidden: true,
    run: ({ print, shell }) => {
      shell.resetStage();
      print(
        <span className="text-term-dim">
          there is no exit — but here&apos;s your portrait back.
        </span>
      );
    },
  },
  {
    name: 'coffee',
    description: 'brew a cup',
    hidden: true,
    run: ({ print }) => {
      print(<pre className="text-term-amber leading-none">{COFFEE}</pre>);
      print(<span className="text-term-dim">☕ brewed. now back to work.</span>);
    },
  },
];
