import type { ShellControls } from '../shell/types';

export type GameProps = {
  // Full grid size (incl. borders), sized by GamePanel to fill the container
  // at the terminal character size.
  cols: number;
  rows: number;
  onExit: () => void;
  playSound: ShellControls['playSound'];
};
