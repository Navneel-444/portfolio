import './ContactInfo.scss';
import * as motion from "motion/react-client";

const headingVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.25, ease: 'easeOut' } }
};

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.25, ease: 'easeOut' } }
};

export default function ContactInfo() {
    const socials = [
        { label: "navneel-444", icon: "github.svg", url: "https://github.com/navneel-444" },
        { label: "navneel-nandran", icon: "linkedin.svg", url: "https://linkedin.com/in/navneel-nandran" },
        { label: "navneel.nandran@gmail.com", icon: "mail.svg", url: "mailto:navneel.nandran@gmail.com" }
    ];

    return (
        <section className="contact-info">
            <motion.div className="contact-info__animated" aria-hidden="true">
                <div className="contact-info__heading">
                    <motion.h2
                        className="contact-info__title"
                        variants={headingVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        Get in Touch
                    </motion.h2>
                    <motion.p
                        className="contact-info__hook"
                        variants={headingVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        Need a developer? I’m available for freelance and job inquiries!
                    </motion.p>
                </div>

                <motion.div
                    className="contact-info__social"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {socials.map((link, idx) => (
                        <motion.a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={idx}
                            className="contact-info__social-link"
                            variants={itemVariants}
                            whileHover={{ y: -3, scale: 1.03 }}
                        >
                            <img src={`/icons/${link.icon}`}
                                width={28}
                                height={28}
                                alt={link.label}
                                className="contact-info__social-icon" />
                            <p className="contact-info__social-name">{link.label}</p>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}