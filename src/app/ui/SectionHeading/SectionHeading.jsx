'use client'
import React, { useRef, useEffect, useState } from 'react';
import './SectionHeading.scss';

function useInView(ref, { once = true, margin = '0px', threshold = 0 } = {}) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref?.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) obs.unobserve(el);
                } else {
                    if (!once) setInView(false);
                }
            },
            { root: null, rootMargin: margin, threshold }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, once, margin, threshold]);

    return inView;
}

export default function SectionHeading({ heading, id }) {
    const titleRef = useRef(null);
    const [svgWidth, setSvgWidth] = useState(0);
    const isInView = useInView(titleRef, { once: true, margin: '-20px' });

    useEffect(() => {
        if (titleRef.current) {
            const width = titleRef.current.offsetWidth;
            setSvgWidth((width * 1.15) + 26);
        }
    }, [heading]);

    return (
        <header className="section-heading" id={id}>
            <h3
                ref={titleRef}
                className={`section-heading__title ${isInView ? 'section-heading__title--visible' : ''}`}
            >
                {heading}
            </h3>
            <svg
                className={`section-heading__decorator ${isInView ? 'section-heading__decorator--visible' : ''}`}
                width={svgWidth}
                height="26"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className="section-heading__decorator-dot"
                    cx="3"
                    cy="3"
                    r="3"
                />
                <path
                    className="section-heading__decorator-line"
                    d={`M 5 5 L 25 25 L ${svgWidth} 25`}
                    fill='none'
                />
            </svg>
        </header>
    )
}