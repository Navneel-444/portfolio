import '../../../styles/main.scss';
import './ProjectDetails.scss';
import BentoItem from '@/app/ui/BentoItem/BentoItem';
import ProjectHeader from '@/app/ui/ProjectHeader/ProjectHeader';
import { bucket } from '@/lib/firebaseAdmin';

export default async function ProjectDetails({ project, allProjects }) {
    const { name, ...projectFields } = project;

    const definitions = [
        { key: 'screenshot', heading: 'Screenshot', variant: 'picture' },
        { key: 'overview', heading: 'Overview', variant: 'regular' },
        { key: 'problem statement', heading: 'Problem Statement', variant: 'regular' },
        { key: 'architecture / system design', heading: 'Architecture', variant: 'double_wide' },
        { key: 'tech stack', heading: 'TechStack', variant: 'tall' },
        { key: 'key features', heading: 'Key Features', variant: 'regular' },
        { key: 'what i learned ', heading: 'What I learned', variant: 'regular' },
        { key: 'future improvements', heading: 'Future Improvements', variant: 'regular' },
    ];

    const bentoItems = await Promise.all(definitions.map(async (def) => {
        const value = projectFields[def.key];

        if (def.key === 'screenshot') {
            const folder = String(name || '').toLowerCase();
            const imagePath = `${folder}/screenshot.webp`;
            
            let imageUrl = null;
            try {
                const file = bucket.file(imagePath);
                const [url] = await file.getSignedUrl({
                    action: 'read',
                    expires: Date.now() + 24 * 60 * 60 * 1000,
                }).catch(() => [null]);
                imageUrl = url;
            } catch (error) {
                console.error(`Error loading image for bento item:`, error);
            }

            return {
                heading: def.heading,
                info: value,
                variant: def.variant,
                imageUrl
            };
        }

        return {
            heading: def.heading,
            info: value,
            variant: def.variant
        };
    }));

    return (
        <main>
            <ProjectHeader
                project={project}
                allProjects={allProjects}
                repo={project.repo}
            />

            <section className="bento-box">
                {bentoItems.map((itemData, idx) => (
                    <BentoItem
                        key={idx}
                        index={idx}
                        heading={itemData.heading}
                        info={itemData.info}
                        variant={itemData.variant}
                        imageUrl={itemData.imageUrl}
                    />
                ))}
            </section>
        </main>
    );
}
