'use client'

import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import './ExperienceSection.scss';
import Timeline from '@/app/ui/Timeline/Timeline';
import useSectionViewTracker from '@/hooks/useSectionViewTracker';

export default function ExperienceSection() {
    useSectionViewTracker('experience');

    return (<>
        <SectionHeading heading={"Experience"} id='experience' />
        <Timeline />
    </>
    )
}