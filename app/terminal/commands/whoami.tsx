import { profile } from '../../data/profile';
import type { Command } from './registry';

const whoami: Command = {
  name: 'whoami',
  description: 'name, title, location',
  run: ({ print }) => {
    print(
      <p>
        <span className="text-term-accent">{profile.name}</span> —{' '}
        {profile.title} · <span className="text-term-dim">{profile.location}</span>
      </p>
    );
  },
};

export default whoami;
