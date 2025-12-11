'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';
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
        
        if (analytics) {
            logEvent(analytics, 'select_project', {
                project_name: project.name
            });
        }
        
        await new Promise((res) => setTimeout(res, 420));
        router.push(`/projects/${project.name}`);
    };

    const handleHover = () => {
        if (!hasHovered && analytics) {
            setTimeout(() => {
                logEvent(analytics, 'hover_project_card', {
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
