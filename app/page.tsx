import SeoContent from './seo-content';
import Experience from './shell/experience';
import { ShellProvider } from './shell/shell-context';

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
