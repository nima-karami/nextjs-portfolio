import { profile } from '../../data/profile';
import type { Command } from './registry';
import { sleep } from './reveal';

function Label({ children }: { children: string }) {
  return <p className="text-term-dim mt-5 mb-1 uppercase">── {children} ──</p>;
}

const resume: Command = {
  name: 'resume',
  description: 'full résumé (experience · education · skills · contact)',
  run: async (ctx) => {
    const { print, registry } = ctx;

    print(
      <div className="space-y-0.5">
        <p className="text-term-accent font-semibold">{profile.name}</p>
        <p className="text-term-fg">{profile.title}</p>
        <p className="text-term-dim">{profile.location}</p>
        <p className="text-term-fg mt-2 max-w-[64ch]">{profile.tagline}</p>
      </div>
    );
    await sleep(180);

    print(<Label>experience</Label>);
    await registry['experience'].run(ctx);
    await sleep(140);

    print(<Label>education</Label>);
    await registry['education'].run(ctx);
    await sleep(140);

    print(<Label>skills</Label>);
    await registry['skills'].run(ctx);
    await sleep(140);

    print(<Label>contact</Label>);
    await registry['contact'].run(ctx);
  },
};

export default resume;
