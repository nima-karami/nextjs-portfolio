import about from './about';
import cat from './cat';
import clear from './clear';
import contact from './contact';
import experience from './experience';
import help from './help';
import ls from './ls';
import projects from './projects';
import type { Command, CommandRegistry } from './registry';
import resume from './resume';
import skills from './skills';
import whoami from './whoami';

const commands: Command[] = [
  help,
  about,
  whoami,
  resume,
  experience,
  projects,
  skills,
  contact,
  ls,
  cat,
  clear,
];

export const registry: CommandRegistry = Object.fromEntries(
  commands.map((c) => [c.name, c])
);
