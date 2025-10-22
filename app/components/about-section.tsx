import Container from './container';
import SectionTitle from './section-title';

function AboutSection() {
  return (
    <section id="about" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <SectionTitle
          title="About Me"
          subtitle="Here's a brief overview of my background and skills."
        />

        <div className="flex gap-4 p-20">{/* Add about me content here */}</div>
      </Container>
    </section>
  );
}

export default AboutSection;
