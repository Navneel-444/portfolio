"use client"
import './Navigation.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [activeId, setActiveId] = useState('');

  const navInfo = [
    { id: 1, name: 'home', href: '#home' },
    { id: 2, name: 'projects', href: '#projects' },
    { id: 3, name: 'experience', href: '#experience' },
    { id: 4, name: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navigation">
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
        <Image
          src="/images/light_icon.png"
          width={20}
          height={20}
          alt="button to change website from light mode/dark mode"
        />
      </button>
    </nav>
  );
}
