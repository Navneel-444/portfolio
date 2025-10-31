import './ProjectCard.scss';
import Link from 'next/link';
import CardImage from './ProjectCardImage';
import ProjectCardAnalytics from './ProjectCardAnalytics';

export default function ProjectCard({ project }) {
    const { name, desc, id, imagePath } = project;

    return (
        <ProjectCardAnalytics projectName={name}>
            <Link
                key={id}
                href={`/projects/${name}`}>
                <div className="project-card__mask">
                    <span className="project-card__expand">
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
                    </span>
                    <CardImage imagePath={imagePath} name={name} />
                </div>
                <section className="project-card__info">
                    <h3 className="project-card__title">{name}</h3>
                    <p className="project-card__description">{desc}</p>
                </section>
            </Link>
        </ProjectCardAnalytics>
    )
}