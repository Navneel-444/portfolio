import './ContactInfo.scss';
import MailIcon from '../../../assets/icons/mail-icon.svg';
import LinkedInIcon from '../../../assets/icons/linkedln-icon.svg';
import GithubIcon from '../../../assets/icons/github-icon.svg';

export default function ContactInfo() {
    const socials = [
        { address: "navneel.nandran@gmail.com", icon: MailIcon, url: "mailto:you@example.com" },
        { address: "navneel-444", icon: GithubIcon, url: "https://github.com/navneel-444" },
        { address: "navneel-nandran", icon: LinkedInIcon, url: "https://linkedin.com/in/navneel-nandran" }
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
                    <a href={link.url} key={idx} className="contact-info__social-link">
                        <link.icon className="contact-info__social-icon" />
                        <p className="contact-info__social-name">{link.address}</p>
                    </a>
                ))}
            </div>
        </section >
    )
}