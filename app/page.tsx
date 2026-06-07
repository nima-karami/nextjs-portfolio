import Experience from './shell/experience';
import { ShellProvider } from './shell/shell-context';
import SeoContent from './seo-content';

export default function Home() {
  return (
    <>
      <SeoContent />
      <ShellProvider>
        <Experience />
      </ShellProvider>
    </>
  );
}
