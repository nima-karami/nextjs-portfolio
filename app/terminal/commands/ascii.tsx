import type { SceneName } from '../../shell/types';
import type { Command } from './registry';

const SCENES: { name: SceneName; desc: string }[] = [
  { name: 'portrait', desc: 'the asciified headshot (default)' },
  { name: 'torus', desc: 'a tumbling torus knot' },
  { name: 'matrix', desc: 'falling-glyph rain' },
  { name: 'skull', desc: 'rotating 3D skull' },
];

const ascii: Command = {
  name: 'ascii',
  description: 'switch the right-panel scene',
  usage: 'ascii <portrait|torus|matrix|skull>',
  run: ({ args, shell, print }) => {
    const arg = args[0]?.toLowerCase();

    if (!arg) {
      print(
        <div className="space-y-1">
          <p className="text-term-dim">scenes — usage: ascii &lt;name&gt;</p>
          <ul className="mt-1 space-y-0.5">
            {SCENES.map((s) => (
              <li key={s.name} className="flex gap-3">
                <span className="text-term-accent w-24 shrink-0">{s.name}</span>
                <span className="text-term-dim">{s.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      );
      return;
    }

    const match = SCENES.find((s) => s.name === arg);
    if (!match) {
      print(
        <span className="text-term-red">
          unknown scene: {arg}. Try <span className="text-term-accent">ascii</span>.
        </span>
      );
      return;
    }

    shell.setStage({ kind: 'scene', scene: match.name });
    print(
      <span className="text-term-dim">
        scene → <span className="text-term-accent">{match.name}</span>
      </span>
    );
  },
};

// Each scene is also exposed as its own flat command (e.g. `/skull`) so the
// whole scene set shows up in the `/` palette, Claude-Code style. `ascii` above
// stays as the lister. Registered via the spread in commands/index.ts.
export const sceneCommands: Command[] = SCENES.map((s) => ({
  name: s.name,
  description: `scene: ${s.desc}`,
  run: ({ shell, print }) => {
    shell.setStage({ kind: 'scene', scene: s.name });
    print(
      <span className="text-term-dim">
        scene → <span className="text-term-accent">{s.name}</span>
      </span>
    );
  },
}));

export default ascii;
