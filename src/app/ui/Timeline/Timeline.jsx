'use client';

import './Timeline.scss';
import TimePeriodCard from '../TimePeriodCard/TimePeriodCard';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Timeline({ experiences }) {
    const [totalHeight, setTotalHeight] = useState(0);

    useEffect(() => {
        if (experiences.length === 0) return;

        const calculateTotalHeight = () => {
            const elements = document.getElementsByClassName('time-period');
            const baseTotal = Array.from(elements).reduce((sum, el) => {
                return sum + el.offsetHeight;
            }, 0);
            const isMobile = window.innerWidth <= 767;
            const mobileExtra = isMobile ? elements.length * 40 : 0;
            const finalTotal = (baseTotal + mobileExtra) * 1.05;
            setTotalHeight(finalTotal);
        };

        calculateTotalHeight();

        window.addEventListener('resize', calculateTotalHeight);
        return () => {
            window.removeEventListener('resize', calculateTotalHeight);
        };
    }, []);

    return (
        <section className="timeline">
            <motion.svg
                className="timeline__center"
                width="20"
                height={`${totalHeight}`}
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: totalHeight }}
                viewport={{ once: true, margin: "75px" }}
                transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: 0.3
                }}
            >
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="15"
                        markerHeight="15"
                        refX="5"
                        refY="5"
                        orient="auto"
                        markerUnits="userSpaceOnUse"
                    >
                        <polyline
                            points="0,0 5,5 0,10"
                            fill="none"
                            stroke="#e87722"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </marker>
                </defs>
                <circle className="timeline__start" cx="10" cy="5" r="5" fill="#e87722" />
                <line
                    x1="10"
                    y1="10"
                    x2="10"
                    y2={`${totalHeight}`}
                    className="timeline__center-line"
                    markerEnd="url(#arrowhead)"
                />
            </motion.svg>
            {experiences.map((period, idx) => (
                <TimePeriodCard
                    key={period.id}
                    info={period}
                    position={idx % 2 === 0 ? 'left' : 'right'}
                />
            ))}
        </section>
    )
}                     