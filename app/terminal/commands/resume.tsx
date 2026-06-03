import { profile } from '../../data/profile';
import type { Command } from './registry';

function Label({ children }: { children: string }) {
  return (
    <p className="text-term-dim mt-3 mb-1 border-b border-term-selection pb-0.5 text-xs tracking-widest uppercase">
      {children}
    </p>
  );
}

const resume: Command = {
  name: 'resume',
  description: 'full résumé (about · experience · skills · contact)',
  run: (ctx) => {
    const { print, registry } = ctx;

    print(
      <div>
        <p className="text-term-accent text-lg font-semibold">{profile.name}</p>
        <p className="text-term-fg">{profile.title}</p>
        <p className="text-term-dim">{profile.location}</p>
        <p className="text-term-fg mt-2 max-w-2xl">{profile.tagline}</p>
      </div>
    );

    print(<Label>experience</Label>);
    registry['experience'].run(ctx);

    print(<Label>skills</Label>);
    registry['skills'].run(ctx);

    print(<Label>contact</Label>);
    registry['contact'].run(ctx);
  },
};

export default resume;
