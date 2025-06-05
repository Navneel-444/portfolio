import './HeroSection.scss';
import HeroStatement from "@/app/ui/HeroStatement/HeroStatement";
import HexSphere from "@/app/ui/HexSphere/HexSphere";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className='hero-section__left'>
                <div className="hero-section__spacer"></div>
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