'use client';

import Timeline from './Timeline';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function TimelineWrapper({ experiences }) {
    const { ref, isVisible } = useIntersectionObserver({
        threshold: 0,
        rootMargin: '75px'
    });

    return (
        <div ref={ref}>
            <Timeline experiences={experiences} isVisible={isVisible} />
        </div>
    );
}
