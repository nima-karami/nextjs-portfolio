import type { ReactNode } from 'react';

import type { ShellControls } from '../../shell/types';

// What a command receives when it runs.
export type CommandContext = {
  args: string[];
  print: (node: ReactNode) => void;
  clear: () => void;
  registry: CommandRegistry;
  shell: ShellControls;
};

export type Command = {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  run: (ctx: CommandContext) => void | Promise<void>;
};

export type CommandRegistry = Record<string, Command>;
