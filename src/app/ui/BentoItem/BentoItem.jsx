import './BentoItem.scss';
import BentoItemPicture from './BentoItemPicture';
import BentoItemModal from './BentoItemModal';

export default function BentoItem({ heading, info, variant, imageUrl, index }) {
    const variantClasses = {
        regular: '',
        tall: 'bento-box__item--tall',
        wide: 'bento-box__item--wide',
        double_wide: 'bento-box__item--double-wide',
    };

    if (variant === 'picture') {
        return <BentoItemPicture heading={heading} imageUrl={imageUrl} index={index} />;
    }

    const hasContent = info && (Array.isArray(info) ? info.length > 0 : true);

    const isArrayOfObjects = Array.isArray(info) && info.length > 0 && typeof info[0] === 'object' && info[0] !== null;

    return (
        <section
            className={`bento-box__item ${variantClasses[variant] || ''}`}
            style={{ animationDelay: `${0.75 + index * 0.08}s` }}
        >
            <h2 className="bento-box__title">{heading || 'No content available'}</h2>
            <BentoItemModal heading={heading} info={info}>
                {hasContent ? (
                    isArrayOfObjects ? (
                        <ul className="bento-box__info">
                            {info.map((item, index) => (
                                <h4 key={index}>
                                    {Object.entries(item).map(([key, value], i) => (
                                        <div key={i}>
                                            <strong>{key}</strong> <br />
                                            <p className="bento-box__subheading">{value}</p>
                                            <br />
                                        </div>
                                    ))}
                                </h4>
                            ))}
                        </ul>
                    ) : Array.isArray(info) ? (
                        <ul className="bento-box__info">
                            {info.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="bento-box__info">{info}</p>
                    )
                ) : (
                    <p className="bento-box__info bento-box__no-content">No content available</p>
                )}
            </BentoItemModal>
        </section >
    );
}