import AboutSection from './components/about-section';
import ContactSection from './components/contact-section';
import FooterSection from './components/footer-section';
import HeroSection from './components/hero-section';
import ProcessSection from './components/process-section';
import ProjectsSection from './components/projects-section';
import ServicesSection from './components/services-section';

export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans">
      <main className="flex w-full flex-col">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
}
