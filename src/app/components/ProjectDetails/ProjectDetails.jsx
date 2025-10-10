'use client'
import { useState, useEffect, useRef } from 'react';
import '../../../styles/main.scss';
import './ProjectDetails.scss'
import Link from 'next/link';
import BentoItem from '@/app/ui/BentoItem/BentoItem';
import ProjectHeader from '@/app/ui/ProjectHeader/ProjectHeader';

export default function ProjectDetails({ project, allProjects }) {
    const {
        desc,
        overview,
        'problem statement': problemStatement,
        'key features': keyFeatures,
        'tech stack': techStack,
        'what i learned ': whatILearned,
        'architecture / system design': architecture,
        'future improvements': futureImprovements,
        name
    } = project;

    return (
        <main>
            <ProjectHeader project={project} allProjects={allProjects} />
            <section className="bento-box">
                <BentoItem heading='Overview' info={overview} variant={'regular'} />
                <BentoItem heading='Problem Statement' info={problemStatement} variant={'regular'} />
                <BentoItem heading='Key Features' info={keyFeatures} variant={'regular'} />
                <BentoItem heading='TechStack' info={techStack} variant={'tall'} />
                <BentoItem heading='What I learned' info={whatILearned} variant={'regular'} />
                <BentoItem heading='What I learned' info={whatILearned} variant={'wide'} />
                <BentoItem heading='Future Improvements' info={futureImprovements} variant={'regular'} />
                <BentoItem heading='Architecture' info={architecture} variant={'double_wide'} />
            </section>
        </main>
    );
}
