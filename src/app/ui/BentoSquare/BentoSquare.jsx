import './BentoSquare.scss';

export default function BentoSquare({ heading, info }) {

    return (
        <section className="square">
            <h2 className="square__title">{heading}</h2>
            {Array.isArray(info) ? (
                <ul className="square__info">
                    {info.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="square__info">{info}</p>
            )}
        </section>
    )
}