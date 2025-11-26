import * as motion from "motion/react-client"
import './ProjectCard.scss';
import Link from 'next/link';
import CardImage from './ProjectCardImage';
import ProjectCardAnalytics from './ProjectCardAnalytics';

const cardVariants = {
    hidden: {
        scale: 0.95,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.25,
            delay: 0.1,
            ease: "easeOut"
        }
    }
};

const textVariants = {
    hidden: {
        opacity: 0,
        y: 0,
        filter: "blur(6px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.25,
            delay: 0.2,
            ease: "easeOut"
        }
    }
};

export default function ProjectCard({ project }) {
    const { name, desc, id, imagePath } = project;

    return (
        <ProjectCardAnalytics projectName={name}>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px", amount: 0.35 }}
                style={{ pointerEvents: 'none' }}
                animate={{ pointerEvents: 'auto' }}
                transition={{ delay: 0.25 }}
            >
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
                        <motion.div
                            key="info"
                            variants={textVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="project-card__title">{name}</h3>
                            <p className="project-card__description">{desc}</p>
                        </motion.div>
                    </section>
                </Link>
            </motion.div>
        </ProjectCardAnalytics>
    )
}