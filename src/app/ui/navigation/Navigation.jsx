"use client"
import './Navigation.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const navInfo = [
    { id: 1, name: './home', href: '/#home' },
    { id: 2, name: '/projects', href: '/#projects' },
    { id: 3, name: '/experience', href: '/#experience' },
    { id: 4, name: '/contact', href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('nav');
      if (window.scrollY > 50) {
        navbar?.classList.add('navigation--scroll');
      } else {
        navbar?.classList.remove('navigation--scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id='nav' className="navigation">
      <h2 className="navigation__heading">Navneel</h2>
      <ul className="navigation__list">
        {navInfo.map((link) => (
          <li key={link.id} className="navigation__list-item">
            <Link
              href={link.href}
              className="navigation__link"
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
