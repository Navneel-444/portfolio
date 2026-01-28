'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logAnalyticsEvent } from '@/app/firebase/firebase';
import ProjectCard from './ProjectCard';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function ProjectCardWrapper({ project }) {
    const router = useRouter();
    const [hasHovered, setHasHovered] = useState(false);
    const { ref, isVisible } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '0px'
    });

    const handleClick = async (e) => {
        e.preventDefault();

        logAnalyticsEvent('select_project', {
            project_name: project.name
        });

        await new Promise((res) => setTimeout(res, 420));
        router.push(`/projects/${project.name}`);
    };

    const handleHover = () => {
        if (!hasHovered) {
            setTimeout(() => {
                logAnalyticsEvent('hover_project_card', {
                    project_name: project.name
                });
                setHasHovered(true);
            }, 1000);
        }
    };

    return (
        <div ref={ref} onMouseEnter={handleHover}>
            <ProjectCard
                project={project}
                isVisible={isVisible}
                onCardClick={handleClick}
            />
        </div>
    );
}
