'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HashScrollHandler() {
    const pathname = usePathname();

    useEffect(() => {
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.substring(1);

                const scrollToElement = () => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                };

                scrollToElement();

                setTimeout(scrollToElement, 100);
                setTimeout(scrollToElement, 300);
            }
        };

        handleHashScroll();

        window.addEventListener('hashchange', handleHashScroll);

        return () => {
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, [pathname]);

    return null;
}
