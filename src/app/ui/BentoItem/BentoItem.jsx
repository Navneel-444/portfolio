import './BentoItem.scss';
import BentoItemPicture from './BentoItemPicture';

export default function BentoItem({ heading, info, variant, imagePath }) {
    const variantClasses = {
        regular: '',
        tall: 'bento-box__item--tall',
        wide: 'bento-box__item--wide',
        double_wide: 'bento-box__item--double-wide',
    };

    if (variant === 'picture') {
        return <BentoItemPicture heading={heading} imagePath={imagePath} />;
    }

    return (
        <section className={`bento-box__item ${variantClasses[variant] || ''}`}>
            <h2 className="bento-box__title">{heading}</h2>
            {Array.isArray(info) ? (
                <ul className="bento-box__info">
                    {info.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="bento-box__info">{info}</p>
            )}
        </section>
    )
}