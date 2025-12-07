'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as motion from "motion/react-client";
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

    const headingVariants = {
        hidden: { opacity: 0, x: 24 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.45, delay: 0.2, ease: 'easeOut' } }
    };

    const pathVariants = {
        hidden: { pathLength: 0 },
        visible: { pathLength: 1, transition: { duration: 0.75, delay: 0.05 } }
    };

    useEffect(() => {
        if (titleRef.current) {
            const width = titleRef.current.offsetWidth;
            setSvgWidth((width * 1.15) + 26);
        }
    }, [heading]);

    return (
        <header className="section-heading" id={id}>
            <motion.h3
                ref={titleRef}
                className="section-heading__title"
                variants={headingVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {heading}
            </motion.h3>
            <motion.svg
                className="section-heading__decorator"
                width={svgWidth}
                height="26"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <circle
                    className="section-heading__decorator-dot"
                    cx="3"
                    cy="3"
                    r="3"
                />
                <motion.path
                    className="section-heading__decorator-line"
                    d={`M 5 5 L 25 25 L ${svgWidth} 25`}
                    fill='none'
                    variants={pathVariants}
                />
            </motion.svg>
        </header>
    )
}