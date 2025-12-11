import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import './ExperienceSection.scss';
import TimelineWrapper from '@/app/ui/Timeline/TimelineWrapper';
import ExperienceSectionWrapper from './ExperienceSectionWrapper';
import { db } from '@/lib/firebaseAdmin.js';

export default async function ExperienceSection() {
    const snapshot = await db.collection("experience").get();
    const experiences = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return (
        <ExperienceSectionWrapper>
            <SectionHeading heading={"Experience"} id='experience' />
            <TimelineWrapper experiences={experiences} />
        </ExperienceSectionWrapper>
    )
}