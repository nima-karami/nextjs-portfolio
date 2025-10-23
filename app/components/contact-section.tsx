import Container from './container';
import GridHover from './grid-hover';

function ContactSection() {
  return (
    <section id="contact" className="border-secondary w-full border-b">
      <Container className="relative flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <GridHover />
        </div>
        <div className="pointer-events-none flex h-[600px] w-full gap-4 p-20"></div>
      </Container>
    </section>
  );
}

export default ContactSection;
