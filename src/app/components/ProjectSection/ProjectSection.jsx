import './ProjectSection.scss';
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import { getDownloadURL, ref } from "firebase/storage";
import { storage, db } from '@/app/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectCard from '@/app/ui/ProjectCard/ProjectCard';
import ShowMoreButton from '@/app/ui/ShowMoreButton/ShowMoreButton';

export default async function ProjectSection() {
    const snapshot = await getDocs(collection(db, "project"));
    const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        desc: doc.data().desc,
        name: doc.data().name,
        imagePath: doc.data().imagePath
    }));

    const projectsWithURLs = await Promise.all(
        projects.map(async (p) => {
            try {
                const imageUrl = p.imagePath
                    ? await getDownloadURL(ref(storage, p.imagePath))
                        .catch(() => null)
                    : null;

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