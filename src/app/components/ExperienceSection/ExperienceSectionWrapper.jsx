'use client';

import useSectionViewTracker from '@/hooks/useSectionViewTracker';

export default function ExperienceSectionWrapper({ children }) {
    useSectionViewTracker('experience');

    return <>{children}</>;
}
