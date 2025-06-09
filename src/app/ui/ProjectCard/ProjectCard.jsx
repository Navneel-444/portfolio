import Image from 'next/image';
import './ProjectCard.scss';

export default function ProjectCard() {
    return (
        <section className="project-card">
            <div className="project-card__mask">
                <button className="project-card__expand">
                    <p className="project-card__expand-text">
                        View Project
                    </p>
                    <Image
                        className='project-card__expand-icon'
                        src='/images/expand-icon.svg'
                        width={14}
                        height={14}
                        alt='icon to expand the hovered project card'
                    />
                </button>
                <Image
                    className='project-card__image'
                    src='/images/project-screenshot.png'
                    width={660}
                    height={292}
                    alt='information on the features of the hexagon sphere'
                />
            </div>
            <section className="project-card__info">
                <h3 className="project-card__title">Portfolio</h3>
                <p className="project-card__description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident doloribus molestias repudiandae facilis sed magnam officia error ducimus veritatis placeat cupiditate magni commodi consectetur deserunt dolore laudantium, quasi culpa? Libero!</p>
            </section>
        </section>
    )
}