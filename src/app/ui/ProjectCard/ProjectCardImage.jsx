'use client';
import './ProjectCard.scss';
import { useState } from 'react';
import Image from 'next/image';

export default function CardImage({ imageUrl, name }) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && !imageError && (
                <div className="project-card__image skeleton" />
            )}
            {imageUrl && !imageError ? (
                <Image
                    src={imageUrl}
                    alt={`Screenshot of ${name} project`}
                    className={`project-card__image ${isLoading ? 'project-card__image--loading' : ''}`}
                    width={400}
                    height={300}
                    loading="lazy"
                    onError={() => {
                        setImageError(true);
                        setIsLoading(false);
                    }}
                    onLoad={() => setIsLoading(false)}
                />
            ) : (
                <img
                    className="project-card__image--placholder"
                    src="/icons/image-placeholder.svg"
                    alt={`Screenshot of ${name} project`}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </>
    );
}
