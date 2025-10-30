import './ProjectSection.scss';
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import { db } from '@/lib/firebaseAdmin.js';
import ProjectCard from '@/app/ui/ProjectCard/ProjectCard';
import ShowMoreButton from '@/app/ui/ShowMoreButton/ShowMoreButton';

export default async function ProjectSection() {
    const snapshot = await db
        .collection("project")
        .select("desc", "name", "id")
        .get();

    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return (
        <>
            <SectionHeading heading="Projects" id='projects' />
            <section className="project__container">
                {projects.map((project) => (
                    < ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}

                <ShowMoreButton />
            </section>
        </>
    );
}