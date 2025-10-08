import './BentoTile.scss';

export default function BentoTile({ heading, info, variant }) {
    const variantClasses = {
        regular: '',
        tall: 'tile--tall',
        wide: 'tile--wide',
        double_wide: 'tile--double-wide'
    };
    return (
        <section className={`tile ${variantClasses[variant] || ''}`}>
            <h2 className="tile__title">{heading}</h2>
            {Array.isArray(info) ? (
                <ul className="tile__info">
                    {info.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="tile__info">{info}</p>
            )}
        </section>
    )
}       