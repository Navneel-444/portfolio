'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HashScrollHandler() {
    const pathname = usePathname();

    useEffect(() => {
        // Handle hash on initial load and navigation
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                // Remove the # from the hash
                const id = hash.substring(1);

                // Use a small delay to ensure the content is rendered
                const scrollToElement = () => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                };

                // Try immediately
                scrollToElement();

                // Also try after a short delay to handle async content
                setTimeout(scrollToElement, 100);
                setTimeout(scrollToElement, 300);
            }
        };

        // Handle on pathname change (navigation)
        handleHashScroll();

        // Also handle hash changes
        window.addEventListener('hashchange', handleHashScroll);

        return () => {
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, [pathname]);

    return null;
}
