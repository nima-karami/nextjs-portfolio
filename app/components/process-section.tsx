import Container from './container';
import SectionTitle from './section-title';

function ProcessSection() {
  return (
    <section id="process" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <SectionTitle
          title="Process"
          subtitle="Here's a brief overview of my development process."
        />

        <div className="flex gap-4 p-20">
          {/* Add process steps or cards here */}
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;
