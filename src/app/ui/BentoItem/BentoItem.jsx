import './BentoItem.scss';
import BentoItemPicture from './BentoItemPicture';
import BentoItemModal from './BentoItemModal';

export default function BentoItem({ heading, info, variant, imageUrl, index }) {
    const variantClasses = {
        regular: '',
        tall: 'bento-box__item--tall',
        wide: 'bento-box__item--wide',
        triple_wide: 'bento-box__item--triple-wide',
        double_wide: 'bento-box__item--double-wide',
    };

    if (variant === 'picture') {
        return <BentoItemPicture heading={heading} imageUrl={imageUrl} index={index} />;
    }

    const hasContent = info && (Array.isArray(info) ? info.length > 0 : true);
    const isArrayOfObjects = Array.isArray(info) && info.length > 0 && typeof info[0] === 'object' && info[0] !== null;
    const isArchitecture = heading === 'Architecture';
    const isTechStack = heading === 'Tech Stack';

    const renderObjectItem = ([key, value], i) => (
        <section key={i}>
            {isTechStack ? (
                <>
                    <strong>{key}</strong> <span style={{ fontWeight: 100 }}>{value}</span>
                </>
            ) : (
                <>
                    <section className='bento-box__entry'>
                        <h4 className='bento-box__subheading'>{key}</h4>
                        <span>-</span>
                        <p className='bento-box__description'>{value}</p>
                    </section>
                </>
            )
            }
        </section >
    );

    const renderObjectArray = () => (
        <ul className="bento-box__info">
            {info.map((item, index) => (
                <h4 key={index}>
                    {Object.entries(item).map(renderObjectItem)}
                </h4>
            ))}
        </ul>
    );

    const renderArchitectureParagraphs = () => (
        <div className="bento-box__info">
            {info.map((item, index) => (
                <p key={index} className="bento-box__paragraph">{item}</p>
            ))}
        </div>
    );

    const renderSimpleArray = () => (
        <ul className="bento-box__info">
            {info.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );

    const renderString = () => <p className="bento-box__info">{info}</p>;

    const renderNoContent = () => (
        <p className="bento-box__info bento-box__no-content">No content available</p>
    );

    const renderContent = () => {
        if (!hasContent) return renderNoContent();
        if (isArrayOfObjects) return renderObjectArray();
        if (Array.isArray(info) && isArchitecture) return renderArchitectureParagraphs();
        if (Array.isArray(info)) return renderSimpleArray();
        return renderString();
    };

    return (
        <section
            className={`bento-box__item ${variantClasses[variant] || ''}`}
            style={{ animationDelay: `${0.75 + index * 0.08}s` }}
        >
            <h2 className="bento-box__title">{heading || 'No content available'}</h2>
            <BentoItemModal heading={heading} info={info}>
                {renderContent()}
            </BentoItemModal>
        </section>
    );
}