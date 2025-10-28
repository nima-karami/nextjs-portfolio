import ContactButton from './contact-button';
import Container from './container';
import FadeInViewAnimation from './fade-in-view-animation';
import GridHover from './grid-hover';

function ContactSection() {
  return (
    <section id="contact" className="border-secondary w-full border-b">
      <Container className="relative flex flex-col items-center justify-center">
        <FadeInViewAnimation delay={0.1} duration={0.5}>
          <div className="absolute inset-0">
            <GridHover />
          </div>
        </FadeInViewAnimation>
        <FadeInViewAnimation delay={0.2} duration={0.5}>
          <div className="pointer-events-none flex h-[600px] w-full flex-col items-center justify-center gap-4 p-8 md:p-20">
            <h2 className="font-jura z-2 text-center text-4xl font-light text-white md:text-5xl lg:text-6xl">
              Get in Touch
            </h2>
            <p className="z-2 max-w-2xl text-center text-lg font-light text-neutral-300 md:text-xl">
              I&apos;m currently open to new opportunities and collaborations.
              Whether you have a project in mind or just want to say hello, feel
              free to reach out!
            </p>
            <ContactButton />
          </div>
        </FadeInViewAnimation>
      </Container>
    </section>
  );
}

export default ContactSection;
