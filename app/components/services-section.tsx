import Card from './card';
import Container from './container';
import SectionTitle from './section-title';
import ServiceCard from './service-card';

export type Service = {
  title: string;
  summary: string;
  featureBullets: string[];
  price: string;
};

const SERVICES: Service[] = [
  {
    title: 'Launch-Ready Landing Page',
    summary: 'Perfect for early-stage startups validating their product.',
    featureBullets: [
      '1-page responsive site',
      'Animated hero + motion transitions',
      'SEO + analytics setup',
      'Delivered in 7 days',
    ],
    price: '$3,000',
  },
  {
    title: 'Marketing Website Sprint',
    summary:
      'Bring your brand to life with a modern, performant multi-page site.',
    featureBullets: [
      '3-6 pages + CMS',
      'Tailwind + Framer Motion',
      'Lighthouse 95+',
    ],
    price: '$6,500',
  },
  {
    title: 'Product Dashboard/MVP',
    summary:
      'Launch your app’s first version with production-grade performance.',
    featureBullets: [
      'Auth, DB, and API ready',
      'Clean UI + motion feedback',
      'Built on Next.js + Prisma',
    ],
    price: '$9,000',
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
        <div className="flex gap-4 p-16">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ServicesSection;
