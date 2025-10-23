import './BentoItem.scss';
import Image from 'next/image';

async function ImageFromStorage({ path }) {
    try {
        return (
            <Image
                src={`/api/image?path=${encodeURIComponent(path)}`}
                alt="project screenshot"
                className="bento-box__image"
                width={400}
                height={300}
                priority
            />
        );
    } catch (error) {
        console.error('Error loading image:', error);
        return null;
    }
}

export default async function BentoItem({ heading, info, variant, imagePath }) {
    const variantClasses = {
        regular: '',
        tall: 'bento-box__item--tall',
        wide: 'bento-box__item--wide',
        double_wide: 'bento-box__item--double-wide',
        picture: 'bento-box__item--picture'
    };
    return (
        <section className={`bento-box__item ${variantClasses[variant] || ''}`}>
            <h2 className="bento-box__title">{heading}</h2>
            {Array.isArray(info) ? (
                <ul className="bento-box__info">
                    {info.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : variant === 'picture' ? (
                <div className="bento-box__info bento-box__info--picture">
                    {imagePath ? (
                        <ImageFromStorage path={imagePath} />
                    ) : (
                        <p className="bento-box__info--no-image">No screenshot available yet</p>
                    )}
                </div>
            ) : (
                <p className="bento-box__info">{info}</p>
            )}
        </section>
    )
}