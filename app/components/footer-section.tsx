import Image from 'next/image';
import Link from 'next/link';

import githubAnimation from '@/public/lottie/github.json';
import linkedinAnimation from '@/public/lottie/linkedin.json';

import AnimatedSocialIcon from './animated-social-icon';
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
              <p className="text-xs text-gray-200 md:text-sm">
                © {new Date().getFullYear()} Nima Karami. All rights reserved.
              </p>
            </div>
            <div className="flex h-full items-center">
              <Link
                href="https://www.linkedin.com/in/nima-karami/"
                aria-label="LinkedIn Account"
                target="_blank"
                className="border-secondary hover:bg-secondary flex h-full items-center border-l text-sm text-gray-400 transition duration-300"
              >
                <AnimatedSocialIcon
                  animationData={linkedinAnimation}
                  className="px-2 md:px-4"
                />
              </Link>
              <Link
                href="https://github.com/nima-karami"
                aria-label="Github Account"
                target="_blank"
                className="border-secondary hover:bg-secondary flex h-full items-center border-l text-sm text-gray-400 transition duration-300"
              >
                <AnimatedSocialIcon
                  animationData={githubAnimation}
                  className="px-2 md:px-4"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}

export default FooterSection;
