'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for triggering animations when element becomes visible
 * @param {Object} options - IntersectionObserver options
 * @param {string|number} options.threshold - Percentage of element visibility needed to trigger (0-1)
 * @param {string} options.rootMargin - Margin around root (e.g., '0px', '100px')
 * @param {boolean} options.triggerOnce - Whether to trigger only once (default: true)
 * @returns {Object} - { ref, isVisible }
 */
export default function useIntersectionObserver({
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
} = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
}
