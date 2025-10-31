'use client';
import './ProjectCard.scss';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/app/firebase/firebase';


export default function CardImage({ imagePath, name }) {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageExists, setImageExists] = useState(true);


    useEffect(() => {
        let isMounted = true;


        const fetchImage = async () => {
            if (!imagePath) {
                setImageExists(false);
                setLoading(false);
                return;
            }


            try {
                const fetchedUrl = await getDownloadURL(ref(storage, imagePath));
                if (isMounted) setUrl(fetchedUrl);
            } catch (err) {
                console.warn(`No image found for ${name}:`, err);
                if (isMounted) {
                    setImageExists(false);
                    setUrl('icons/image-placeholder.svg');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };


        fetchImage();


        return () => { isMounted = false; };
    }, [imagePath, name]);


    return loading ? (
        <div className="project-card__image skeleton" />
    ) : (
        <img
            className={imageExists ? 'project-card__image' : ' project-card__image--placholder'}
            src={url} alt={`Screenshot of ${name} project`}
            loading="lazy"
            decoding="async"
        />
    );
}
