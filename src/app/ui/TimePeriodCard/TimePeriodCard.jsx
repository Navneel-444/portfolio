import './TimePeriodCard.scss';
import * as motion from "motion/react-client";

const cardVariants = {
    hidden: position => ({
        opacity: 0,
        x: position === 'left' ? -50 : 50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 35,
            damping: 25,
            duration: 1.5,
            delay: 0.5
        }
    }
};

export default function TimePeriodCard({ info, position }) {
    const { company, desc, end, role, start } = info;
    const date = `${start}-${end}`

    return (
        <motion.div
            className={`time-period time-period--${position}`}
            variants={cardVariants}
            custom={position}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className={`time-period__container time-period__container--${position}`}>
                <aside className={position == 'left' ? "time-period__year time-period__year--left" : 'time-period__year'}>
                    <p className="time-period__year-text">{date}</p>
                </aside>
                <section className='time-period__info'>
                    <section className={position == 'left' ? "time-period__heading time-period__heading--left" : 'time-period__heading'}>
                        <h3 className="time-period__job-title">{role}</h3>
                        <p className="time-period__company">{company}</p>
                    </section>
                    <p className="time-period__job-description">{desc}</p>
                </section>
            </div>
        </motion.div>
    )
}