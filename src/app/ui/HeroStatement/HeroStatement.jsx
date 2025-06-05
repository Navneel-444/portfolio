import './HeroStatement.scss';
import Image from 'next/image'

export default function HeroStatement() {
    return (
        <article>
            <div className="hero-statement__title">
                <h1 className='hero-statement__heading'>Hi, I'm Navneel!</h1>
                <h3 className='hero-statement__subheading'>Software Engineer | Full-stack Developer</h3>
            </div>
            <p className='hero-statement__description'>
                Building tools that make work easier. I create software that automates tasks, so you can focus on what truly matters.
            </p>
            <a href="/resume.pdf" className='hero-statement__anchor' download>
                <buton className="hero-statement__resume-btn">
                    <Image
                        className='hero-statement__btn-icon'
                        src='images/download-icon.svg'
                        width={10}
                        height={15}
                        alt='button to download resume'
                    />
                    <p className="hero-statement__btn-text">Resume</p>
                </buton>
            </a>
        </article>
    )
}  