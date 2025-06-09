'use client';

import React, { useRef, useEffect, useState } from 'react';
import './SectionHeading.scss';

export default function SectionHeading({ heading }) {
    const titleRef = useRef(null);
    const [svgWidth, setSvgWidth] = useState(0);

    useEffect(() => {
        if (titleRef.current) {
            const width = titleRef.current.offsetWidth;
            console.log(width)
            setSvgWidth((width * 1.15) + 26);
        }
    }, [heading]);

    return (
        <div className="section-heading">
            <h3 ref={titleRef} className="section-heading__title">{heading}</h3>
            <svg className="section-heading__decorator" width={svgWidth} height="26" xmlns="http://www.w3.org/2000/svg">
                <circle className="section-heading__decorator-dot" cx="3" cy="3" r="3" />
                <path
                    className="section-heading__decorator-line"
                    d={`M 5 5 L 25 25 L ${svgWidth} 25`}
                    fill='none'
                />
            </svg>
        </div>
    )
}