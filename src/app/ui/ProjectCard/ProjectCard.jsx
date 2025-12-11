import './ProjectCard.scss';
import Link from 'next/link';
import CardImage from './ProjectCardImage';

export default function ProjectCard({ project, isVisible, onCardClick }) {
    const { name, desc, id, imageUrl } = project;

    return (
        <div className={`project-card ${isVisible ? 'project-card--visible' : ''}`}>
            <Link key={id} href={`/projects/${name}`} onClick={onCardClick}>
                    <div className="project-card__mask">
                        <span className="project-card__expand">
                            <p className="project-card__expand-text">View Project</p>
                            <img
                                className='project-card__expand-icon'
                                src='/icons/expand.svg'
                                width={14}
                                height={14}
                                alt='icon to expand the hovered project card'
                            />
                        </span>
                        <CardImage imageUrl={imageUrl} name={name} />
                    </div>
                    <section className="project-card__info">
                        <div className={`project-card__text ${isVisible ? 'project-card__text--visible' : ''}`}>
                            <h3 className="project-card__title">{name}</h3>
                            <p className="project-card__description">{desc}</p>
                        </div>
                    </section>
                </Link>
            </div>
    )
}