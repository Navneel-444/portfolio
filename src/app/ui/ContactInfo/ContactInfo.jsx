'use client';
import './ContactInfo.scss';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { analytics } from '@/app/firebase/firebase';
import { logEvent } from 'firebase/analytics';

export default function ContactInfo() {
    const { ref, isVisible } = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: '0px'
    });

    const socials = [
        { label: "navneel-444", icon: "github.svg", url: "https://github.com/navneel-444", type: "github" },
        { label: "navneel-nandran", icon: "linkedin.svg", url: "https://linkedin.com/in/navneel-nandran", type: "linkedin" },
        { label: "navneel.nandran@gmail.com", icon: "mail.svg", url: "mailto:navneel.nandran@gmail.com", type: "email" }
    ];

    const handleSocialClick = (type) => {
        if (analytics) {
            logEvent(analytics, 'click_social_link', {
                link_type: type
            });
        }
    };

    return (
        <section ref={ref} className={`contact-info ${isVisible ? 'contact-info--visible' : ''}`}>
            <div className="contact-info__animated" aria-hidden="true">
                <div className="contact-info__heading">
                    <h2 className="contact-info__title">
                        Get in Touch
                    </h2>
                    <p className="contact-info__hook">
                        Need a developer? I'm available for freelance and job inquiries!
                    </p>
                </div>

                <div className="contact-info__social">
                    {socials.map((link, idx) => (
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={idx}
                            className="contact-info__social-link"
                            style={{ animationDelay: `${0.35 + idx * 0.1}s` }}
                            onClick={() => handleSocialClick(link.type)}
                        >
                            <img src={`/icons/${link.icon}`}
                                width={28}
                                height={28}
                                alt={link.label}
                                className="contact-info__social-icon" />
                            <p className="contact-info__social-name">{link.label}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}