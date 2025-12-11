'use client';

import useSectionViewTracker from '@/hooks/useSectionViewTracker';

export default function ProjectSectionWrapper({ children }) {
    useSectionViewTracker('projects');

    return <>{children}</>;
}
