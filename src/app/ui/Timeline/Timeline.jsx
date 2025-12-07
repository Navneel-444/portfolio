'use client'
import './Timeline.scss';
import TimePeriodCard from '../TimePeriodCard/TimePeriodCard';
import * as motion from "motion/react-client";

export default function Timeline({ experiences }) {
    return (
        <section className="timeline">
            <motion.svg
                className="timeline__center"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true, margin: "75px" }}
                transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    delay: 0.3
                }}
                style={{ transformOrigin: 'top' }}
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
                    y2="100%"
                    className="timeline__center-line"
                    markerEnd="url(#arrowhead)"
                    vectorEffect="non-scaling-stroke"
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