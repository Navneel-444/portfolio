'use client';

import { useEffect } from 'react';
import { logAnalyticsEvent } from '@/app/firebase/firebase';

export default function usePageTimeTracking() {
    useEffect(() => {
        const startTime = Date.now();
        let lastActiveTime = startTime;
        let totalActiveTime = 0;

        const updateActiveTime = () => {
            lastActiveTime = Date.now();
        };

        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, updateActiveTime);
        });

        const activityInterval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastActivity = now - lastActiveTime;

            if (timeSinceLastActivity < 5000) {
                totalActiveTime += 5000;
            }
        }, 5000);

        const handleUnload = () => {
            const totalTime = Math.floor((Date.now() - startTime) / 1000); // in seconds
            const activeTime = Math.floor(totalActiveTime / 1000); // in seconds

            logEvent(analytics, 'time_on_page', {
                time_seconds: totalTime,
                active_time_seconds: activeTime,
                engagement_rate: totalTime > 0 ? Math.round((activeTime / totalTime) * 100) : 0
            });
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, updateActiveTime);
            });
            clearInterval(activityInterval);
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);
}
