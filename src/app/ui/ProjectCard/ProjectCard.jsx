'use client'
import './ProjectCard.scss';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';
import Link from 'next/link';
import { useState } from 'react';
import CardImage from './ProjectCardImage';

export default function ProjectCard({ project }) {
    const { name, desc, id, imagePath } = project;
    const [hasHovered, setHasHovered] = useState(false);
    const handleProjectClick = () => {
        if (analytics) {
            logEvent(analytics, 'select_project',
                {
                    project_name: name
                }
            )
        }
    }
    const handleHover = () => {
        if (!hasHovered && analytics) {
            setTimeout(() => {
                logEvent(analytics, "hover_project_card", {
                    project_name: name
                });
                setHasHovered(true);
            }, 1000);
        }
    };
    return (
        <section onMouseEnter={handleHover} onClick={handleProjectClick} className="project-card">
            <Link
                key={id}
                href={`/projects/${name}`}>
                <div className="project-card__mask">
                    <span className="project-card__expand">
                        <p className="project-card__expand-text">
                            View Project
                        </p>
                        <img
                            className='project-card__expand-icon'
                            src='/icons/expand.svg'
                            width={14}
                            height={14}
                            alt='icon to expand the hovered project card'
                        />
                    </span>
                    <CardImage imagePath={imagePath} name={name} />
                </div>
                <section className="project-card__info">
                    <h3 className="project-card__title">{name}</h3>
                    <p className="project-card__description">{desc}</p>
                </section>
            </Link>
        </section>
    )
}