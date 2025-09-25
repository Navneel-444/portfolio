"use client"
import './Navigation.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [activeId, setActiveId] = useState('');

  const navInfo = [
    { id: 1, name: './home', href: '/#home' },
    { id: 2, name: '/projects', href: '/#projects' },
    { id: 3, name: '/experience', href: '/#experience' },
    { id: 4, name: '/contact', href: '/#contact' },
  ];

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[id]')).filter(el =>
      ['SECTION', 'DIV', 'H2', 'HEADER'].includes(el.tagName)
    );

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let currentSectionId = '';

      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) {
          currentSectionId = section.id;
        }
      }

      if (currentSectionId !== activeId) {
        setActiveId(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('nav');
      if (window.scrollY > 5) {
        navbar?.classList.add('navigation--scroll');
      } else {
        navbar?.classList.remove('navigation--scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav id='nav' className="navigation">
      <h2 className="navigation__heading">Navneel</h2>
      <ul className="navigation__list">
        {navInfo.map((link) => (
          <li key={link.id} className="navigation__list-item">
            <Link
              href={link.href}
              className={`navigation__link ${activeId === link.href.substring(1) ? 'active' : ''
                }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <button className="navigation__theme">
        <img
          src="/icons/light.svg"
          width={20}
          height={20}
          alt="button to change website from light mode/dark mode"
        />
      </button>
    </nav>
  );
}
