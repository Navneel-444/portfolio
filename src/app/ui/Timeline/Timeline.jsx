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
            description: "Led a team of 30+ to boost productivity by 33%. Built an Excel tool that predicted vendor cases with 95% accuracy, cutting errors and speeding up workflows by 30%. Streamlined inventory processes, cutting processing time by 30% in a huge warehouse."
        },
        {
            title: "Web Developer",
            company: "Creative Web Studio",
            date: "2020-2021",
            description: "Guided 15 warehouse staff to improve dock throughput by 25%, handling 50,000 more cases. Created a new system that cut paperwork errors by 25% and improved inventory accuracy. Improved scheduling to raise process accuracy from 85% to 98%."
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
            const baseTotal = Array.from(elements).reduce((sum, el) => {
                return sum + el.offsetHeight;
            }, 0);

            // Add 40px per element on mobile (<= 767px)
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