'use client';

import './Timeline.scss';
import TimePeriodCard from '../TimePeriodCard/TimePeriodCard';
import { useEffect, useState } from 'react';

export default function Timeline() {
    const [totalHeight, setTotalHeight] = useState(0);

    const periods = [
        {
            title: "Frontend Developer",
            company: "Tech Solutions Inc.",
            date: "2022-2021",
            description: "Developed and maintained web applications using React, improved UI/UX, and collaborated with cross-functional teams."
        },
        {
            title: "Web Developer",
            company: "Creative Web Studio",
            date: "2020-2021",
            description: "Built responsive websites, optimized performance, and integrated REST APIs for various client projects."
        },
        {
            title: "Junior Developer",
            company: "Startup Hub",
            date: "2019-2020",
            description: "Assisted in developing MVPs, wrote unit tests, and participated in code reviews for early-stage products."
        }
    ];

    useEffect(() => {
        const calculateTotalHeight = () => {
            const elements = document.getElementsByClassName('time-period');
            const total = Array.from(elements).reduce((sum, el) => {
                return sum + el.offsetHeight;
            }, 0);
            setTotalHeight(total * 1.05);
        };

        calculateTotalHeight();

        window.addEventListener('resize', calculateTotalHeight);

        return () => {
            window.removeEventListener('resize', calculateTotalHeight);
        };
    }, []);

    return (
        <section className="timeline">
            <svg className="timeline__center" width="20" height={`${totalHeight}`} xmlns="http://www.w3.org/2000/svg">
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
            </svg>
            {periods.map((period, idx) => (
                <TimePeriodCard
                    key={idx}
                    info={period}
                    position={idx % 2 === 0 ? 'left' : 'right'}
                />
            ))}
        </section>
    )
}                     