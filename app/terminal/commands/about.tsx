import { profile } from '../../data/profile';
import { sleep } from './reveal';
import type { Command } from './registry';

const about: Command = {
  name: 'about',
  description: 'who is Nima?',
  run: async ({ print }) => {
    for (const paragraph of profile.bio) {
      print(<p className="mt-3">{paragraph}</p>);
      await sleep(120);
    }
  },
};

export default about;
