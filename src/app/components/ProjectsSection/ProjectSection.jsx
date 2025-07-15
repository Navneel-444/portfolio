import './ProjectSection.scss';
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import { db } from '@/lib/firebaseAdmin.js';
import ProjectCard from '@/app/ui/ProjectCard/ProjectCard';
import ShowMoreButton from '@/app/ui/ShowMoreButton/ShowMoreButton';

export default async function ProjectSection() {
    const snapshot = await db.collection("project").get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return (
        <>
            <SectionHeading heading="Projects" id='projects' />
            <section className="project__container">
                {projects.map((project, idx) => (
                    < ProjectCard
                        key={project.id}
                        project={project}
                        position={idx % 2 === 0 ? 'left' : 'right'}
                    />
                ))}
                <ShowMoreButton />
            </section>
        </>
    );
}