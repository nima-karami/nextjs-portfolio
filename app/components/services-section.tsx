import Card from './card';
import Container from './container';
import SectionTitle from './section-title';

type Service = {
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    title: 'Web Development',
    description:
      'Building responsive and dynamic websites using modern technologies like React, Next.js, and Tailwind CSS.',
  },
  {
    title: 'UI/UX Design',
    description:
      'Designing user-friendly interfaces with a focus on user experience and accessibility.',
  },
  {
    title: 'Performance Optimization',
    description:
      'Improving website performance through code optimization, lazy loading, and efficient asset management.',
  },
];

function ServicesSection() {
  return (
    <section id="services" className="border-secondary w-full border-b">
      <Container className="flex flex-col">
        <SectionTitle
          title="Services"
          subtitle="I offer a range of services to help you build and enhance your web presence. Here are some of the key services I provide:"
        />
        <div className="flex gap-4 p-20">
          {SERVICES.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ServicesSection;
