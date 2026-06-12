import { THEMES } from '../../shell/types';
import type { CommandCategory } from '../../util/analytics';
import { sceneCommands } from './ascii';
import { easterEggs } from './easter-eggs';

const SCENE = new Set<string>(sceneCommands.map((c) => c.name)); // portrait, torus, matrix, skull
const THEME = new Set<string>([...THEMES, 'theme']);
const GAME = new Set<string>(['snake', 'invaders', 'pong', 'games']);
const SYSTEM = new Set<string>(['help', 'clear', 'sound']);
const EGG = new Set<string>(easterEggs.map((c) => c.name));

// Bucket a command name for analytics. Defaults to 'info' (about/resume/etc.).
export function commandCategory(name: string): CommandCategory {
  if (name === 'ascii' || SCENE.has(name)) return 'scene';
  if (THEME.has(name)) return 'theme';
  if (GAME.has(name)) return 'game';
  if (SYSTEM.has(name)) return 'system';
  if (EGG.has(name)) return 'egg';
  return 'info';
}
