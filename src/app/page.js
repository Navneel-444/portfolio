import '../styles/main.scss';
import HeroSection from '@/app/components/HeroSection/HeroSection';
import ProjectSection from '@/app/components/ProjectSection/ProjectSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import ContactSection from './components/ContactSection/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
