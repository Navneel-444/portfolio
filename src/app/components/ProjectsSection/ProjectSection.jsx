import './ProjectSection.scss';
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import ProjectCard from '@/app/ui/ProjectCard/ProjectCard';
import ShowMoreButton from '@/app/ui/ShowMoreButton/ShowMoreButton';

export default function ProjectSection() {
    return (
        <>
            <SectionHeading heading="Projects" id='projects' />
            <section className="project__container">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ShowMoreButton />
            </section>
        </>
    )
}