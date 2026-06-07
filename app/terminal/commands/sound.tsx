import { playTone } from '../../shell/audio';
import type { Command } from './registry';

const sound: Command = {
  name: 'sound',
  description: 'toggle sound effects (sound on|off)',
  usage: 'sound [on|off]',
  run: ({ args, shell, print }) => {
    const arg = args[0]?.toLowerCase();
    const on = arg === 'on' ? true : arg === 'off' ? false : !shell.soundEnabled;
    shell.setSound(on);
    if (on) playTone('select'); // confirm beep (bypasses the just-set state)
    print(
      <span className="text-term-dim">
        sound{' '}
        <span className={on ? 'text-term-green' : 'text-term-amber'}>
          {on ? 'on' : 'off'}
        </span>
        {on ? ' — chiptune blips enabled' : ''}
      </span>
    );
  },
};

export default sound;
