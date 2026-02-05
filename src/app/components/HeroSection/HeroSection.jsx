'use client'
import './HeroSection.scss';
import dynamic from "next/dynamic";
import HeroStatement from "@/app/ui/HeroStatement/HeroStatement";
import useSectionViewTracker from '@/hooks/useSectionViewTracker';

export default function HeroSection() {
    const HexSphere = dynamic(
        () => import("@/app/ui/HexSphere/HexSphere"),
        { ssr: false }
    );

    useSectionViewTracker('home');

    return (
        <section id='home' className="hero-section">
            <HeroStatement />
            <HexSphere />
            <div className="hero-section__location">
                <p className="hero-section__location-text">Brampton, ON</p>
            </div>
        </section>
    )
}
