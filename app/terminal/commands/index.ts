import about from './about';
import ascii from './ascii';
import cat from './cat';
import clear from './clear';
import contact from './contact';
import { easterEggs } from './easter-eggs';
import experience from './experience';
import games from './games';
import help from './help';
import invaders from './invaders';
import ls from './ls';
import pong from './pong';
import projects from './projects';
import type { Command, CommandRegistry } from './registry';
import resume from './resume';
import skills from './skills';
import snake from './snake';
import sound from './sound';
import theme from './theme';
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
  games,
  snake,
  invaders,
  pong,
  sound,
  theme,
  ascii,
  clear,
  ...easterEggs,
];

export const registry: CommandRegistry = Object.fromEntries(
  commands.map((c) => [c.name, c])
);
