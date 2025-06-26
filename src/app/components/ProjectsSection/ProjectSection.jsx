'use client';

import './ProjectSection.scss';
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import ProjectCard from '@/app/ui/ProjectCard/ProjectCard';
import ShowMoreButton from '@/app/ui/ShowMoreButton/ShowMoreButton';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/firebase'
import useSectionViewTracker from '@/hooks/useSectionViewTracker';

export default function ProjectSection() {
    const [projects, setProjects] = useState([]);
    useSectionViewTracker('projects');

    useEffect(() => {
        async function getProjects() {
            const snapshot = await getDocs(collection(db, "project"))
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(data);
        }
        getProjects();
    }, []);

    return (
        <>
            <SectionHeading heading="Projects" id='projects' />
            <section className="project__container">
                {projects.map((project, idx) => (
                    < ProjectCard
                        key={project.id}
                        project={project}
                        position={idx % 2 === 0 ? 'left' : 'right'}
                    />
                ))}
                <ShowMoreButton />
            </section>
        </>
    )
}