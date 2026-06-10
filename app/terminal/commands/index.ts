import about from './about';
import ascii, { sceneCommands } from './ascii';
import clear from './clear';
import contact from './contact';
import { easterEggs } from './easter-eggs';
import education from './education';
import experience from './experience';
import games from './games';
import help from './help';
import invaders from './invaders';
import pong from './pong';
import type { Command, CommandRegistry } from './registry';
import resume from './resume';
import skills from './skills';
import snake from './snake';
import sound from './sound';
import theme, { themeCommands } from './theme';
import whoami from './whoami';

const commands: Command[] = [
  help,
  about,
  whoami,
  resume,
  experience,
  education,
  skills,
  contact,
  games,
  snake,
  invaders,
  pong,
  sound,
  theme,
  ...themeCommands,
  ascii,
  ...sceneCommands,
  clear,
  ...easterEggs,
];

export const registry: CommandRegistry = Object.fromEntries(
  commands.map((c) => [c.name, c])
);
