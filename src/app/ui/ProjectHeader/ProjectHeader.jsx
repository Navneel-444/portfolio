'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './ProjectHeader.scss';
import * as motion from "motion/react-client";

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

    const fadeSlide = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.55,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.header
            className="project-header"
            variants={fadeSlide}
            initial="hidden"
            animate="show"
        >
            <nav
                className={`project-header__dropdown ${isDropdownOpen ? 'project-header__dropdown--show' : ''}`}
                ref={dropdownRef}
                aria-label="Project navigation"
            >
                <div className="project-header__current">
                    <h1 className="project-header__current-title">{name}</h1>
                    <button
                        className={`project-header__dropdown-btn ${isDropdownOpen ? 'project-header__dropdown-btn--show' : ''}`}
                        onClick={toggleDropdown}
                        aria-expanded={isDropdownOpen}
                        aria-label="Toggle project dropdown menu"
                        aria-haspopup="true"
                    >
                        <img
                            src="/icons/down-arrow.svg"
                            alt="Dropdown arrow icon"
                            width={12}
                            height={7.5}
                        />
                    </button>
                </div>

                {isDropdownOpen && (
                    <ul
                        className="project-header__dropdown-content"
                        role="menu"
                    >
                        {allProjects
                            .map((p, idx) => ({ ...p, index: idx }))
                            .filter(p => p.name !== name)
                            .map(p => (
                                <li key={p.index} role="none">
                                    <Link
                                        href={`/projects/${p.name}`}
                                        className="project-header__dropdown-link"
                                        role="menu item"
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                )}
            </nav>

            <nav className='project-header__link' aria-label="Project links">
                <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!live}
                >
                    <button
                        className={live ? "project-header__link-btn" : "project-header__link-btn project-header__link-btn--disabled"}
                        disabled={!live}
                    >
                        <span className="project-header__link-title">Live</span>
                        <img
                            className='project-header__link-icon'
                            src="/icons/expand.svg"
                            alt="External link icon"
                            width={16}
                            height={14}
                        />
                    </button>
                </a>

                <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!repo}
                >
                    <button
                        className={repo ? "project-header__link-btn" : "project-header__link-btn project-header__link-btn--disabled"}
                        disabled={!repo}
                    >
                        <span className="project-header__link-title">Github Repo</span>
                        <img
                            className='project-header__link-icon'
                            src="/icons/expand.svg"
                            alt="External link icon"
                            width={16}
                            height={14}
                        />
                    </button>
                </a>
            </nav>
        </motion.header>
    );
}
