import './ContactInfo.scss';

export default function ContactInfo() {
    const socials = [
        { label: "navneel.nandran@gmail.com", icon: "mail.svg", url: "mailto:navneel.nandran@gmail.com" },
        { label: "navneel-444", icon: "github.svg", url: "https://github.com/navneel-444" },
        { label: "navneel-nandran", icon: "linkedin.svg", url: "https://linkedin.com/in/navneel-nandran" }
    ]
    return (
        <section className="contact-info">
            <div className="contact-info__heading">
                <h2 className="contact-info__title">Get in Touch</h2>
                <p className="contact-info__hook">
                    Need a developer? I’m available for freelance and job inquiries!
                </p>
            </div>
            <div className="contact-info__social">
                {socials.map((link, idx) => (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" key={idx} className="contact-info__social-link">
                        <img src={`/icons/${link.icon}`}
                            width={28}
                            height={28}
                            alt='information on the features of the hexagon sphere'
                            className="contact-info__social-icon" />
                        <p className="contact-info__social-name">{link.label}</p>
                    </a>
                ))}
            </div>
        </section >
    )
}