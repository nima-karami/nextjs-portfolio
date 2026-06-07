import Experience from './shell/experience';
import { ShellProvider } from './shell/shell-context';

export default function Home() {
  return (
    <ShellProvider>
      <Experience />
    </ShellProvider>
  );
}
