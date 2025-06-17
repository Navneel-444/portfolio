import '../styles/main.scss';
import HeroSection from '@/app/components/HeroSection/HeroSection';
import ProjectSection from '@/app/components/ProjectsSection/ProjectSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
    </>
  );
}
