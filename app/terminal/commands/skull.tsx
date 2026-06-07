import type { Command } from './registry';

const skull: Command = {
  name: 'skull',
  description: 'summon a rotating 3D ASCII skull',
  run: ({ shell, print }) => {
    shell.setStage({ kind: 'scene', scene: 'skull' });
    print(<span className="text-term-dim">☠ summoning skull… (ascii portrait to return)</span>);
  },
};

export default skull;
