import '../styles/main.scss';
import HeroSection from '@/app/components/HeroSection/HeroSection';
import ProjectSection from '@/app/components/ProjectSection/ProjectSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import ContactSection from './components/ContactSection/ContactSection';
import HashScrollHandler from './ui/HashScrollHandler/HashScrollHandler';

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <main>
        <HeroSection />
        <ProjectSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
