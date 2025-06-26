import './ProjectCard.scss';

export default function ProjectCard({ project }) {
    const { name, desc } = project;

    return (
        <section className="project-card">
            <div className="project-card__mask">
                <button className="project-card__expand">
                    <p className="project-card__expand-text">
                        View Project
                    </p>
                    <img
                        className='project-card__expand-icon'
                        src='/icons/expand.svg'
                        width={14}
                        height={14}
                        alt='icon to expand the hovered project card'
                    />
                </button>
                <img
                    className='project-card__image'
                    src='/project-screenshot.png'
                    width={660}
                    height={292}
                    alt='information on the features of the hexagon sphere'
                />
            </div>
            <section className="project-card__info">
                <h3 className="project-card__title">{name}</h3>
                <p className="project-card__description">{desc}</p>
            </section>
        </section>
    )
}