import { socials } from '../../data/socials';
import type { Command } from './registry';

const links: [string, string, string][] = [
  ['email', socials.email, `mailto:${socials.email}`],
  ['github', 'github.com/nima-karami', socials.github],
  ['linkedin', 'in/nima-karami', socials.linkedin],
];

const contact: Command = {
  name: 'contact',
  description: 'how to reach me',
  run: ({ print }) => {
    print(
      <div className="space-y-1">
        <p className="text-term-dim">
          Open to new opportunities and collaborations — say hello.
        </p>
        {links.map(([label, text, href]) => (
          <p key={label} className="flex gap-3">
            <span className="text-term-accent w-20 shrink-0">{label}</span>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-term-fg underline underline-offset-2"
            >
              {text}
            </a>
          </p>
        ))}
      </div>
    );
  },
};

export default contact;
