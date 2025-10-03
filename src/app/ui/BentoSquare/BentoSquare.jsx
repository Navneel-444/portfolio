import './BentoSquare.scss';

export default function BentoSquare({ heading, info }) {

    return (
        <section className="square">
            <h2 className="square-title">{heading}</h2>
            {Array.isArray(info) ? (
                <ul className="square-info">
                    {info.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="square-info">{info}</p>
            )}
        </section>
    )
}