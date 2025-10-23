import Image from 'next/image';
import Link from 'next/link';

import { SlSocialLinkedin } from 'react-icons/sl';
import { VscGithubAlt } from 'react-icons/vsc';

import Container from './container';

function FooterSection() {
  return (
    <footer>
      <div className="border-secondary w-full border-b">
        <Container>
          <div className="h-16" />
        </Container>
      </div>
      <section id="footer" className="border-secondary w-full border-b">
        <Container className="flex h-16 justify-between">
          <Link
            href="/"
            className="border-secondary hover:bg-secondary flex h-full items-center border-r px-4 transition duration-300"
          >
            <Image
              src="/images/logo-white.png"
              alt="Logo"
              width={64}
              height={32}
              className="inline-block"
            />
          </Link>
          <div className="flex">
            <div className="border-secondary flex h-full items-center border-l px-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Nima Karami. All rights reserved.
              </p>
            </div>
            <div className="flex h-full items-center">
              <Link
                href="https://www.linkedin.com/in/nima-karami/"
                className="border-secondary hover:bg-secondary flex h-full items-center border-l px-4 text-sm text-gray-400 transition duration-300"
              >
                <SlSocialLinkedin size={20} />
              </Link>
              <Link
                href="https://github.com/nima-karami"
                className="border-secondary hover:bg-secondary flex h-full items-center border-l px-4 text-sm text-gray-400 transition duration-300"
              >
                <VscGithubAlt size={20} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}

export default FooterSection;
