'use client';

import { useEffect } from 'react';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';

export default function usePageTimeTracking() {
    useEffect(() => {
        if (!analytics) return;

        const startTime = Date.now();
        let lastActiveTime = startTime;
        let totalActiveTime = 0;

        const updateActiveTime = () => {
            lastActiveTime = Date.now();
        };

        // Track user activity
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, updateActiveTime);
        });

        // Check if user is still active every 5 seconds
        const activityInterval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastActivity = now - lastActiveTime;
            
            // If user was active in the last 5 seconds, count it as active time
            if (timeSinceLastActivity < 5000) {
                totalActiveTime += 5000;
            }
        }, 5000);

        const handleUnload = () => {
            const totalTime = Math.floor((Date.now() - startTime) / 1000); // in seconds
            const activeTime = Math.floor(totalActiveTime / 1000); // in seconds
            
            logEvent(analytics, 'time_on_page', {
                total_time_seconds: totalTime,
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
