import type { ReactNode } from 'react';

// What a command receives when it runs. Kept small and extensible — scene/theme
// control gets added to this context in later phases.
export type CommandContext = {
  args: string[];
  print: (node: ReactNode) => void;
  clear: () => void;
  registry: CommandRegistry;
};

export type Command = {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  run: (ctx: CommandContext) => void | Promise<void>;
};

export type CommandRegistry = Record<string, Command>;
