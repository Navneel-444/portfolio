'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './ProjectHeader.scss';

export default function ProjectHeader({ project, allProjects, repo }) {
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
                <Link
                    href={"https://github.com"}
                >
                    <button className="project-header__link-btn">
                        <p className="project-header__link-title">Live</p>
                        <img
                            src="/icons/expand.svg"
                            alt="button to redirect to the git repo of the project"
                            width={16}
                            height={14}
                        />
                    </button>
                </Link>
                <Link
                    href={repo}
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
            </section>
        </header>
    );
}
