'use client';
import './BentoItem.scss';
import BentoItemPicture from './BentoItemPicture';
import { useState } from 'react';

export default function BentoItem({ heading, info, variant, imagePath, variants, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const variantClasses = {
        regular: '',
        tall: 'bento-box__item--tall',
        wide: 'bento-box__item--wide',
        double_wide: 'bento-box__item--double-wide',
    };

    if (variant === 'picture') {
        return <BentoItemPicture heading={heading} imagePath={imagePath} index={index} />;
    }

    const hasContent = info && (Array.isArray(info) ? info.length > 0 : true);

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
            <section
                className={`bento-box__item ${variantClasses[variant] || ''}`}
                style={{ animationDelay: `${0.5 + index * 0.08}s` }}
            >
                <h2 className="bento-box__title">{heading || 'No content available'}</h2>
                <div className="bento-box__content-wrapper">
                    <button
                        className="bento-box__expand-btn"
                        onClick={handleExpand}
                        aria-label="Expand content"
                    >
                        <img src="/icons/expand-tile.svg" alt="" width="16" height="16" />
                    </button>
                    {hasContent ? (
                        Array.isArray(info) ? (
                            <ul className="bento-box__info">
                                {info.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="bento-box__info">{info}</p>
                        )
                    ) : (
                        <p className="bento-box__info bento-box__no-content">No content available</p>
                    )}
                </div>
            </section>

            {isExpanded && (
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
                                className="bento-box__close-`btn"
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
                </div>
            )}
        </>
    )
}