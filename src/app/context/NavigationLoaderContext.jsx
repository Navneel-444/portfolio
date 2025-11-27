"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import CyberpunkLoader from '@/app/ui/Loader/Loader';

const NavigationLoaderContext = createContext({ showLoader: () => { }, hideLoader: () => { } });

export function NavigationLoaderProvider({ children }) {
    const [visible, setVisible] = useState(false);

    const startRef = useRef(null);
    const hideTimerRef = useRef(null);
    const autoHideRef = useRef(null);

    const MIN_VISIBLE_MS = 1000; // minimum time the loader should remain visible

    const clearHideTimer = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const clearAutoHide = () => {
        if (autoHideRef.current) {
            clearTimeout(autoHideRef.current);
            autoHideRef.current = null;
        }
    };

    const showLoader = useCallback(() => {
        // quick debug trace when loader is shown
        try { console.debug?.('NavigationLoader: showLoader called'); } catch (e) { }
        clearHideTimer();
        clearAutoHide();
        startRef.current = Date.now();
        setVisible(true);
    }, []);

    const hideLoader = useCallback(() => {
        try { console.debug?.('NavigationLoader: hideLoader called'); } catch (e) { }

        // If we never showed, just ensure hidden
        if (!startRef.current) {
            setVisible(false);
            return;
        }

        const elapsed = Date.now() - startRef.current;
        const remaining = MIN_VISIBLE_MS - elapsed;

        clearHideTimer();

        if (remaining <= 0) {
            setVisible(false);
            startRef.current = null;
        } else {
            // schedule hide after remaining ms
            hideTimerRef.current = setTimeout(() => {
                setVisible(false);
                startRef.current = null;
                hideTimerRef.current = null;
            }, remaining);
        }
    }, []);

    // safety auto-hide so the overlay can't get stuck (e.g. navigation/hydration issues)
    useEffect(() => {
        if (!visible) return;
        // clear any existing auto-hide then set a fresh one
        clearAutoHide();
        autoHideRef.current = setTimeout(() => {
            try { console.warn('NavigationLoader: auto-hiding loader after timeout'); } catch (e) { }
            // force-hide immediately
            setVisible(false);
            startRef.current = null;
            autoHideRef.current = null;
            clearHideTimer();
        }, 10000); // 10s

        return () => {
            clearAutoHide();
        };
    }, [visible]);

    useEffect(() => {
        return () => {
            clearHideTimer();
            clearAutoHide();
        };
    }, []);

    return (
        <NavigationLoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}
            {visible ? <CyberpunkLoader /> : null}
        </NavigationLoaderContext.Provider>
    );
}

export function useNavigationLoader() {
    return useContext(NavigationLoaderContext);
}

export default NavigationLoaderContext;
