'use client'
import { useState, useEffect, useRef } from 'react';
import '../../../styles/main.scss';
import './ProjectDetails.scss'
import Link from 'next/link';
import BentoItem from '@/app/ui/BentoItem/BentoItem';
import ProjectHeader from '@/app/ui/ProjectHeader/ProjectHeader';

export default function ProjectDetails({ project, allProjects }) {
    const { name, ...projectFields } = project;

    const definitions = [
        { key: 'overview', heading: 'Overview', variant: 'regular' },
        { key: 'problem statement', heading: 'Problem Statement', variant: 'regular' },
        { key: 'key features', heading: 'Key Features', variant: 'regular' },
        { key: 'tech stack', heading: 'TechStack', variant: 'tall' },
        { key: 'what i learned ', heading: 'What I learned', variant: 'regular' },
        { key: 'what i learned ', heading: 'What I learned', variant: 'wide' },
        { key: 'future improvements', heading: 'Future Improvements', variant: 'regular' },
        { key: 'architecture / system design', heading: 'Architecture', variant: 'double_wide' }
    ];

    const bentoItems = definitions.map((def) => ({
        heading: def.heading,
        info: projectFields[def.key],
        variant: def.variant
    }));

    return (
        <main>
            <ProjectHeader project={project} allProjects={allProjects} />
            <section className="bento-box">
                {bentoItems.map((item, idx) => (
                    <BentoItem
                        key={`${item.heading}-${idx}`}
                        heading={item.heading}
                        info={item.info}
                        variant={item.variant}
                    />
                ))}
            </section>
        </main>
    );
}
