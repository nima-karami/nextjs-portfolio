import { files } from './fs';
import type { Command } from './registry';

const cat: Command = {
  name: 'cat',
  description: 'print a file (try: cat about.txt)',
  usage: 'cat <file>',
  run: (ctx) => {
    const { args, print, registry } = ctx;
    const target = args[0];

    if (!target) {
      print(<span className="text-term-dim">usage: cat &lt;file&gt; — see ls</span>);
      return;
    }

    const command = files[target];
    if (!command) {
      print(
        <span className="text-term-red">
          cat: {target}: No such file. Type{' '}
          <span className="text-term-accent">ls</span>.
        </span>
      );
      return;
    }

    registry[command].run({ ...ctx, args: [] });
  },
};

export default cat;
