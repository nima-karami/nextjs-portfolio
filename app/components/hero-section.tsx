import Container from './container';
import Headshot from './headshot';

function HeroSection() {
  return (
    <section id="hero" className="border-secondary w-full border-b">
      <Container className="grid-background flex flex-col items-center justify-center p-20">
        <Headshot />
        <h1 className="mt-6 text-4xl font-bold text-gray-200">Nima Karami</h1>
        <p className="mt-2 text-center text-gray-400">
          Software Engineer | Web Developer | Tech Enthusiast
        </p>
        <p className="mt-4 max-w-xl text-center text-gray-300">
          I build lightning-fast, design-driven frontends with React, Next.js,
          and Framer Motion.
        </p>
      </Container>
    </section>
  );
}

export default HeroSection;
