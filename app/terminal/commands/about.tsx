import { profile } from '../../data/profile';
import type { Command } from './registry';

const about: Command = {
  name: 'about',
  description: 'who is Nima?',
  run: ({ print }) => {
    print(
      <div className="max-w-2xl space-y-2">
        {profile.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    );
  },
};

export default about;
