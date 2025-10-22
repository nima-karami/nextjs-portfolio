import Container from './container';

function ContactSection() {
  return (
    <section id="contact" className="border-secondary w-full border-b">
      <Container className="flex flex-col bg-gray-100">
        <div className="flex h-[600px] gap-4 p-20">
          {/* Add contact content here */}
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
