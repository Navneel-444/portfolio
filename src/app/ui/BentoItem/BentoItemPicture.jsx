'use client';
import { useState } from 'react';
import Image from 'next/image';
import * as motion from 'motion/react-client';
import './BentoItem.scss';

export default function BentoItemPicture({ heading, imagePath, variants }) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
    <motion.section variants={variants} className="bento-box__item bento-box__item--picture">
            <h2 className="bento-box__title">{heading}</h2>
            <div className="bento-box__info bento-box__info--picture">
                {imagePath ? (
                    <>
                        {isLoading && !imageError && (
                            <div className="bento-box__skeleton"></div>
                        )}
                        {!imageError ? (
                            <Image
                                src={`/api/image?path=${encodeURIComponent(imagePath)}`}
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
        </motion.section>
    );
}