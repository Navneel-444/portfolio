"use client";
import { useEffect } from 'react';
import { useNavigationLoader } from '@/app/context/NavigationLoaderContext';

export default function ProjectDetailsHydrator() {
    const { hideLoader } = useNavigationLoader();

    useEffect(() => {
        // hide the global loader when the details page has hydrated
        hideLoader();
    }, [hideLoader]);

    return null;
}
