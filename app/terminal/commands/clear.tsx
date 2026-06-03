import type { Command } from './registry';

const clear: Command = {
  name: 'clear',
  description: 'clear the screen',
  run: ({ clear }) => clear(),
};

export default clear;
