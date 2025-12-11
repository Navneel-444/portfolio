import './Timeline.scss';
import TimePeriodCard from '../TimePeriodCard/TimePeriodCard';

export default function Timeline({ experiences, isVisible }) {
    return (
        <section className="timeline">
            <svg
                className={`timeline__center ${isVisible ? 'timeline__center--visible' : ''}`}
                width="20" b
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
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
            </svg>
            {experiences.map((period, idx) => (
                <TimePeriodCard
                    key={period.id}
                    info={period}
                    position={idx % 2 === 0 ? 'left' : 'right'}
                    index={idx}
                    isVisible={isVisible}
                />
            ))}
        </section>
    )
}