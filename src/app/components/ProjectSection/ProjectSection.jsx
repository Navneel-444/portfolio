import './ProjectSection.scss';
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import ProjectCardWrapper from '@/app/ui/ProjectCard/ProjectCardWrapper';
import ShowMoreButton from '@/app/ui/ShowMoreButton/ShowMoreButton';
import ProjectSectionWrapper from './ProjectSectionWrapper';
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
                    // First try the exact path from database
                    let file = bucket.file(p.imagePath);
                    let [exists] = await file.exists();
                    
                    // If the exact path doesn't exist, try multiple formats
                    if (!exists && p.imagePath.includes('/')) {
                        const formats = ['webp', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'bmp', 'ico', 'avif'];
                        const basePath = p.imagePath.substring(0, p.imagePath.lastIndexOf('.'));
                        
                        for (const format of formats) {
                            const testPath = `${basePath}.${format}`;
                            file = bucket.file(testPath);
                            [exists] = await file.exists();
                            if (exists) break;
                        }
                    }
                    
                    if (exists) {
                        const [url] = await file.getSignedUrl({
                            action: 'read',
                            expires: Date.now() + 24 * 60 * 60 * 1000,
                        }).catch(() => [null]);
                        imageUrl = url;
                    }
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
        <ProjectSectionWrapper>
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
        </ProjectSectionWrapper>
    );
}