import '../styles/main.scss';
import HeroSection from '@/app/components/HeroSection/HeroSection';
import ProjectSection from '@/app/components/ProjectsSection/ProjectSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import ContactSection from './components/ContactSection/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
