import './BentoItem.scss';

export default function BentoItem({ heading, info, variant }) {
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
                    <img
                        src="/project-screenshot.png"
                        alt="project screenshot"
                    />
                </div>
            ) : (
                <p className="bento-box__info">{info}</p>
            )}
        </section>
    )
}