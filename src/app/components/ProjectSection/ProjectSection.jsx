import './ProjectSection.scss';
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import ProjectCardWrapper from '@/app/ui/ProjectCard/ProjectCardWrapper';
import ShowMoreButton from '@/app/ui/ShowMoreButton/ShowMoreButton';
import { db, bucket } from '@/lib/firebaseAdmin';

export default async function ProjectSection() {
    const snapshot = await db.collection("project").get();
    const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        desc: doc.data().desc,
        name: doc.data().name,
        imagePath: doc.data().imagePath
    }));

    const projectsWithURLs = await Promise.all(
        projects.map(async (p) => {
            try {
                let imageUrl = null;
                if (p.imagePath) {
                    const file = bucket.file(p.imagePath);
                    const [url] = await file.getSignedUrl({
                        action: 'read',
                        expires: Date.now() + 24 * 60 * 60 * 1000,
                    }).catch(() => [null]);
                    imageUrl = url;
                }

                return {
                    ...p,
                    imageUrl,
                    hasError: !imageUrl
                };
            } catch (error) {
                console.error(`Error loading image for project ${p.name}:`, error);
                return {
                    ...p,
                    imageUrl: null,
                    hasError: true
                };
            }
        })
    );

    return (
        <>
            <SectionHeading heading="Projects" id='projects' />
            <section className="project__container">
                {projectsWithURLs.map((project) => (
                    <ProjectCardWrapper
                        key={project.id}
                        project={project}
                    />
                ))}
                <ShowMoreButton />
            </section>
        </>
    );
}