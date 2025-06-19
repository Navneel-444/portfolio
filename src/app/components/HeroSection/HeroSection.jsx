import './HeroSection.scss';
import HeroStatement from "@/app/ui/HeroStatement/HeroStatement";
import HexSphere from "@/app/ui/HexSphere/HexSphere";

export default function HeroSection() {
    return (
        <section id='home' className="hero-section">
            <div className='hero-section__left'>
                <HeroStatement />
            </div>
            <div className='hero-section__right'>
                <HexSphere />
            </div>
            <div className="hero-section__location">
                <p className="hero-section__location-text">Brampton, ON</p>
            </div>
        </section>
    )
}