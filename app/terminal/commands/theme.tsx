import { THEME_LABELS } from '../../shell/themes';
import type { ThemeName } from '../../shell/types';
import type { Command } from './registry';

const theme: Command = {
  name: 'theme',
  description: 'switch color theme',
  usage: 'theme [dark|crt-green|crt-amber|paper|list]',
  run: ({ args, shell, print }) => {
    const arg = args[0]?.toLowerCase();

    if (arg === 'list' || arg === '-l') {
      print(
        <div className="space-y-0.5">
          <p className="text-term-dim">available themes:</p>
          {shell.themes.map((t) => (
            <p key={t} className="flex gap-3">
              <span className="text-term-accent w-24 shrink-0">{t}</span>
              <span className="text-term-dim">
                {THEME_LABELS[t]}
                {t === shell.theme ? ' ← current' : ''}
              </span>
            </p>
          ))}
        </div>
      );
      return;
    }

    if (arg) {
      if (!shell.themes.includes(arg as ThemeName)) {
        print(
          <span className="text-term-red">
            unknown theme: {arg}. Try <span className="text-term-accent">theme list</span>.
          </span>
        );
        return;
      }
      shell.setTheme(arg as ThemeName);
      shell.playSound('select');
      print(
        <span className="text-term-dim">
          theme → <span className="text-term-accent">{arg}</span>
        </span>
      );
      return;
    }

    const next = shell.cycleTheme();
    shell.playSound('select');
    print(
      <span className="text-term-dim">
        theme → <span className="text-term-accent">{next}</span>{' '}
        <span className="text-term-dim">(theme list for all)</span>
      </span>
    );
  },
};

export default theme;
