import Image from 'next/image';

import Container from './container';

function FooterSection() {
  return (
    <footer>
      <section id="footer" className="border-secondary w-full border-b">
        <Container className="flex h-16 justify-between">
          <div className="border-secondary flex h-full items-center border-r px-4">
            <Image
              src="/images/logo-white.png"
              alt="Logo"
              width={64}
              height={32}
              className="inline-block"
            />
          </div>
          <div className="border-secondary flex h-full items-center border-l px-4">
            <p className="text-sm text-gray-400">
              © 2023 Your Company. All rights reserved.
            </p>
          </div>
        </Container>
      </section>
    </footer>
  );
}

export default FooterSection;
