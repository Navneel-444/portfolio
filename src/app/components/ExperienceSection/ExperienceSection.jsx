import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import './ExperienceSection.scss';
import Timeline from '@/app/ui/Timeline/Timeline';

export default function ExperienceSection() {
    return (<>
        <SectionHeading heading={"Experience"} id='experience' />
        <Timeline />
    </>
    )
}