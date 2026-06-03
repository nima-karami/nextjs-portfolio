import about from './about';
import clear from './clear';
import help from './help';
import type { Command, CommandRegistry } from './registry';
import whoami from './whoami';

const commands: Command[] = [help, about, whoami, clear];

export const registry: CommandRegistry = Object.fromEntries(
  commands.map((c) => [c.name, c])
);
