'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './BentoItem.scss';

export default function BentoItemPicture({ heading, imageUrl, index }) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!imageUrl) {
            setIsLoading(false);
        }
    }, [imageUrl]);

    return (
        <section
            className="bento-box__item bento-box__item--picture"
            style={{ animationDelay: `${0.5 + index * 0.08}s` }}
        >
            <h2 className="bento-box__title">{heading}</h2>
            <div className="bento-box__info bento-box__info--picture">
                {imageUrl ? (
                    <>
                        {isLoading && !imageError && (
                            <div className="bento-box__skeleton"></div>
                        )}
                        {!imageError ? (
                            <Image
                                src={imageUrl}
                                alt="project screenshot"
                                className={`bento-box__image ${isLoading ? 'bento-box__image--loading' : ''}`}
                                width={400}
                                height={300}
                                priority
                                onError={() => {
                                    setImageError(true);
                                    setIsLoading(false);
                                }}
                                onLoad={() => setIsLoading(false)}
                            />
                        ) : (
                            <div className="bento-box__placeholder">
                                <img
                                    src="/icons/image-placeholder.svg"
                                    alt="Project screenshot placeholder"
                                    className="bento-box__image bento-box__image--placeholder"
                                    width={32}
                                    height={24}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bento-box__placeholder">
                        <img
                            src="/icons/image-placeholder.svg"
                            alt="Project screenshot placeholder"
                            width={48}
                            height={48}
                            className="bento-box__placeholder-icon"
                        />
                        <p className="bento-box__placeholder-text">No screenshot available</p>
                    </div>
                )}
            </div>
        </section>
    );
}