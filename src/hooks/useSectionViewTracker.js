'use client'
import { useEffect } from 'react';
import { logAnalyticsEvent } from '@/app/firebase/firebase';

export default function useSectionViewTracker(sectionId) {
    useEffect(() => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    logAnalyticsEvent('view_section', {
                        section_id: sectionId,
                    });
                    observer.unobserve(section); // Only log once
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, [sectionId]);
}
