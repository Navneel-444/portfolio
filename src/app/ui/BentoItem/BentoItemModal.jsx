'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './BentoItem.scss';

export default function BentoItemModal({ heading, info, children }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showExpandButton, setShowExpandButton] = useState(false);
    const wrapperRef = useRef(null);
    const hasContent = info && (Array.isArray(info) ? info.length > 0 : true);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const checkOverflow = () => {
            const wrapper = wrapperRef.current;
            // Find the bento-box__info element inside the wrapper
            const infoElement = wrapper.querySelector('.bento-box__info');
            if (!infoElement) return;

            const contentHeight = infoElement.scrollHeight;
            const visibleHeight = infoElement.clientHeight;
            setShowExpandButton(contentHeight > visibleHeight);
        };

        // Small delay to ensure content is fully rendered
        const timer = setTimeout(checkOverflow, 100);
        window.addEventListener('resize', checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [children]);

    const handleExpand = () => {
        setIsExpanded(true);
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        setIsExpanded(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <div className="bento-box__content-wrapper" ref={wrapperRef}>
                {showExpandButton && (
                    <button
                        className="bento-box__expand-btn"
                        onClick={handleExpand}
                        aria-label="Expand content"
                    >
                        <img src="/icons/expand-tile.svg" alt="" width="16" height="16" />
                    </button>
                )}
                {children}
            </div>
            {mounted && isExpanded && createPortal(
                <div
                    className="bento-box__modal-overlay"
                    onClick={handleClose}
                >
                    <div
                        className="bento-box__modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bento-box__modal-header">
                            <h2 className="bento-box__modal-title">{heading}</h2>
                            <button
                                className="bento-box__close-btn"
                                onClick={handleClose}
                                aria-label="Close modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="bento-box__modal-body">
                            {hasContent ? (
                                Array.isArray(info) ? (
                                    <ul className="bento-box__info bento-box__info--expanded">
                                        {info.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="bento-box__info bento-box__info--expanded">{info}</p>
                                )
                            ) : null}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
