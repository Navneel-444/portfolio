'use client'
import { useState, useEffect, useRef } from 'react';
import '../../../styles/main.scss';
import BentoSquare from '@/app/ui/BentoSquare/BentoSquare';
import './ProjectDetails.scss'
import Link from 'next/link';

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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <main>
            <header className="header">
                <section className="header__project-menu" ref={dropdownRef}>
                    <h1 className="header__project-title">{name}</h1>
                    <div className="dropdown">
                        <button
                            className={`dropdown__btn ${isDropdownOpen ? 'dropdown__btn--show' : ''}`}
                            onClick={toggleDropdown}
                        >
                            <img
                                src="/icons/down-arrow.svg"
                                alt="dropdown menu for selecting other projects"
                                width={12}
                                height={7.5}
                            />
                        </button>
                        <ul className={`dropdown__content ${isDropdownOpen ? 'dropdown__content--show' : ''}`}>
                            {allProjects
                                .map((p, index) => ({ ...p, index: index }))
                                .filter(project => project.name !== name)
                                .map((project) => (
                                    <Link
                                        key={project.index}
                                        href={`/projects/${project.name}`}>
                                        <li key={project.name} className="dropdown__item">
                                            {project.name}
                                        </li>
                                    </Link>
                                ))}
                        </ul>
                    </div>
                </section>
                <Link
                    href={"https://github.com"}
                >
                    <button className="link__btn">
                        <p className="link__title">Github Repo</p>
                        <img
                            src="/icons/expand.svg"
                            alt="button to redirect to the git repo of the project"
                            width={16}
                            height={14}
                        />
                    </button>
                </Link>
            </header>

            <BentoSquare heading='Overview' info={overview} />
            <BentoSquare heading='Problem Statement' info={problemStatement} />
            <BentoSquare heading='Key Features' info={keyFeatures} />
        </main>
    );
}
