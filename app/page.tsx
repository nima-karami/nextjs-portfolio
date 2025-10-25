import AboutSection from './components/about-section';
import ContactSection from './components/contact-section';
import ExperienceSection from './components/experience-section';
import FooterSection from './components/footer-section';
import HeroSection from './components/hero-section';

export default function Home() {
  return (
    <div className="font-roboto flex items-center justify-center">
      <main className="flex w-full flex-col">
        <HeroSection />
        <ExperienceSection />
        {/* <ProjectsSection /> */}
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
}
