'use client';

import usePageTimeTracking from '@/hooks/usePageTimeTracking';

export default function PageTimeTracker({ children }) {
    usePageTimeTracking();
    return <>{children}</>;
}
