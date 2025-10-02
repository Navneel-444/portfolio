import './BentoSquare.scss';

export default function BentoSquare({ heading, info }) {

    return (
        <section className="square">
            <h2 className="square-title">{heading}</h2>
            <p className="square-info">{info}</p>
        </section>
    )

}