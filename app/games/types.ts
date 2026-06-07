import type { ShellControls } from '../shell/types';

export type GameProps = {
  onExit: () => void;
  playSound: ShellControls['playSound'];
};
