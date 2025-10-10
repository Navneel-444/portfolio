'use client'
import { useState, useEffect, useRef } from 'react';
import '../../../styles/main.scss';
import './ProjectDetails.scss'
import Link from 'next/link';
import BentoItem from '@/app/ui/BentoItem/BentoItem';

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
            <header className="project-header">
                <section className={`project-header__dropdown ${isDropdownOpen ? 'project-header__dropdown--show' : ''}`} ref={dropdownRef}>
                    <div className="project-header__current">
                        <h1 className="project-header__current-title">{name}</h1>
                        <button
                            className={`project-header__dropdown-btn ${isDropdownOpen ? 'project-header__dropdown-btn--show' : ''}`}
                            onClick={toggleDropdown}
                        >
                            <img
                                src="/icons/down-arrow.svg"
                                alt="dropdown menu for selecting other projects"
                                width={12}
                                height={7.5}
                            />
                        </button>
                    </div>
                    <ul className={`project-header__dropdown-content ${isDropdownOpen ? 'project-header__dropdown-content--show' : ''}`}>
                        {allProjects
                            .map((p, index) => ({ ...p, index: index }))
                            .filter(project => project.name !== name)
                            .map((project) => (
                                <Link
                                    key={project.index}
                                    href={`/projects/${project.name}`}>
                                    <li key={project.name} className="project-header__dropdown-item">
                                        {project.name}
                                    </li>
                                </Link>
                            ))}
                    </ul>
                </section>
                <Link
                    href={"https://github.com"}
                >
                    <button className="project-header__link-btn">
                        <p className="project-header__link-title">Github Repo</p>
                        <img
                            src="/icons/expand.svg"
                            alt="button to redirect to the git repo of the project"
                            width={16}
                            height={14}
                        />
                    </button>
                </Link>
            </header>
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
