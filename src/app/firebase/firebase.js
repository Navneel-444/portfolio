import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Lazy load analytics asynchronously to avoid blocking the main thread
let analyticsInstance;
let analyticsPromise;

const getAnalyticsAsync = () => {
    if (typeof window === "undefined") {
        return Promise.resolve(null);
    }

    if (analyticsInstance) {
        return Promise.resolve(analyticsInstance);
    }

    if (!analyticsPromise) {
        analyticsPromise = import("firebase/analytics")
            .then(({ getAnalytics }) => {
                analyticsInstance = getAnalytics(app);
                return analyticsInstance;
            })
            .catch((error) => {
                console.error("Failed to load analytics:", error);
                return null;
            });
    }

    return analyticsPromise;
};

// Helper function to log events asynchronously
export const logAnalyticsEvent = async (eventName, eventParams) => {
    try {
        const analytics = await getAnalyticsAsync();
        if (!analytics) return;

        const { logEvent } = await import("firebase/analytics");
        logEvent(analytics, eventName, eventParams);
    } catch (error) {
        console.error("Error logging analytics event:", error);
    }
};

export { getAnalyticsAsync };