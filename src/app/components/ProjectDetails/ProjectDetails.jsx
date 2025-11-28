"use client";
import '../../../styles/main.scss';
import './ProjectDetails.scss';
import BentoItem from '@/app/ui/BentoItem/BentoItem';
import ProjectHeader from '@/app/ui/ProjectHeader/ProjectHeader';
import ProjectDetailsHydrator from './ProjectDetailsHydrator';

import * as motion from 'motion/react-client';

export default function ProjectDetails({ project, allProjects }) {
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

    const bentoItems = definitions.map((def) => {
        const value = projectFields[def.key];

        if (def.key === 'screenshot') {
            const folder = String(name || '').toLowerCase();
            return {
                heading: def.heading,
                info: value,
                variant: def.variant,
                imagePath: `${folder}/screenshot.webp`
            };
        }

        return {
            heading: def.heading,
            info: value,
            variant: def.variant
        };
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 1 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    return (
        <main>
            <ProjectDetailsHydrator />

            <ProjectHeader
                project={project}
                allProjects={allProjects}
                repo={project.repo}
            />

            {/* Bento Grid w/ animation */}
            <motion.section
                className="bento-box"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {bentoItems.map((itemData, idx) => (
                    <BentoItem
                        key={idx}
                        variants={item}
                        heading={itemData.heading}
                        info={itemData.info}
                        variant={itemData.variant}
                        imagePath={itemData.imagePath}
                    />
                ))}
            </motion.section>
        </main>
    );
}
