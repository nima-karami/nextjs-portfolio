import Container from './container';
import FadeInAnimation from './fade-in-animation';
import Headshot from './headshot';

function HeroSection() {
  return (
    <section id="hero" className="w-full">
      <FadeInAnimation className="border-secondary w-full border-b">
        <Container className="animated-container flex w-full p-8 md:p-20">
          <div className="z-2 flex w-full flex-col items-center justify-center">
            <Headshot />
            <h1 className="font-jura mt-6 text-4xl font-light text-gray-200 uppercase">
              Nima Karami
            </h1>
            <p className="font-jura mt-2 text-center text-gray-400">
              Lead Full-stack Developer | UX/UI Designer
            </p>
            <p className="mt-4 max-w-xl text-center text-gray-300">
              Software engineer with a background in design and architecture. I
              specialize in building scalable web applications and crafting
              user-centric digital experiences.
            </p>
          </div>
        </Container>
      </FadeInAnimation>
    </section>
  );
}

export default HeroSection;
