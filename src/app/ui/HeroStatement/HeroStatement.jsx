import './HeroStatement.scss';
import { logAnalyticsEvent } from '@/app/firebase/firebase';

export default function HeroStatement() {

    const handleResumeDownload = () => {
        logAnalyticsEvent("resume_downloads");
    };

    return (
        <article className='hero-statement'>
            <div className="hero-statement__title">
                <h2 className='hero-statement__heading'>
                    Hi, I'm Navneel!
                </h2>
                <h3 className='hero-statement__subheading'>
                    Software Engineer | Full-stack Developer
                </h3>
            </div>
            <p className='hero-statement__description'>
                Building tools that make work easier. I create software that automates tasks, so you can focus on what truly matters.
            </p>
            <a
                href="/resume.pdf"
                className="hero-statement__download"
                download
                onClick={handleResumeDownload}
            >
                <button className="hero-statement__resume-btn">
                    <img
                        className="hero-statement__btn-icon"
                        src="/icons/download.svg"
                        width={10}
                        height={15}
                        alt="button icon"
                    />
                    <p className="hero-statement__btn-text">
                        Resume</p>
                </button>
            </a>
        </article>
    );
}
