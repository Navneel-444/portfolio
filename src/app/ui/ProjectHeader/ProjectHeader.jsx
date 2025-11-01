'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './ProjectHeader.scss';

export default function ProjectHeader({ project, allProjects, repo, live }) {
    const { name } = project;
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
                        .filter(p => p.name !== name)
                        .map((p) => (
                            <Link
                                key={p.index}
                                href={`/projects/${p.name}`}>
                                <li className="project-header__dropdown-item">
                                    {p.name}
                                </li>
                            </Link>
                        ))}
                </ul>
            </section>
            <section className='project-header__link'>
                <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className={live ? "project-header__link-btn" : " project-header__link-btn project-header__link-btn--disabled"}>
                        <p className="project-header__link-title">Live</p>
                        <img
                            className='project-header__link-icon'
                            src="/icons/expand.svg"
                            alt="button to redirect to the git repo of the project"
                            width={16}
                            height={14}
                        />
                    </button>
                </a>
                <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className={repo ? "project-header__link-btn" : " project-header__link-btn project-header__link-btn--disabled"} >
                        <p className="project-header__link-title">Github Repo</p>
                        <img
                            className='project-header__link-icon'
                            src="/icons/expand.svg"
                            alt="button to redirect to the git repo of the project"
                            width={16}
                            height={14}
                        />
                    </button>
                </a>
            </section>
        </header>
    );
}
