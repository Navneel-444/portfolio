'use client'

import { useState } from 'react';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';

const logProjectClick = (projectName) => {
    if (analytics) {
        logEvent(analytics, 'select_project', {
            project_name: projectName
        });
    }
};

const logProjectHover = (projectName) => {
    if (analytics) {
        logEvent(analytics, 'hover_project_card', {
            project_name: projectName
        });
    }
};

export default function ProjectCardAnalytics({ children, projectName }) {
    const [hasHovered, setHasHovered] = useState(false);

    const handleProjectClick = () => {
        logProjectClick(projectName);
    };

    const handleHover = () => {
        if (!hasHovered) {
            setTimeout(() => {
                logProjectHover(projectName);
                setHasHovered(true);
            }, 1000);
        }
    };

    return (
        <section onMouseEnter={handleHover} onClick={handleProjectClick} className="project-card">
            {children}
        </section>
    );
}