'use client';
import './MobileNav.scss';
import { useState } from 'react';

export default function MobileNav() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };
    const navItems = [
        { name: './home', href: '#home' },
        { name: '/projects', href: '#projects' },
        { name: '/exprience', href: '#experience' },
        { name: '/contact', href: '#contact' },
    ];
    return (
        <nav className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}>
            <button className={`mobile-nav__btn ${isOpen ? 'mobile-nav__btn--open' : ''}`} onClick={toggleOverlay}>
                <span className={`mobile-nav__logo ${isOpen ? 'mobile-nav__logo--open' : ''}`}>Navneel</span>
                <img
                    src={`/icons/${isOpen ? `close.svg` : `hamburger.svg`}`}
                    alt="icon to open mobile navigation"
                    className="mobile-nav__icon"
                    width={20}
                    height={20}
                />
            </button>
            <section className="mobile-nav__overlay">
                {navItems.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                    >
                        {item.name}
                    </a>
                ))}
            </section>
        </nav>
    )
}
