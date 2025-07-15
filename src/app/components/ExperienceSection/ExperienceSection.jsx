
import SectionHeading from '@/app/ui/SectionHeading/SectionHeading';
import './ExperienceSection.scss';
import { db } from '@/lib/firebaseAdmin.js';
import Timeline from '@/app/ui/Timeline/Timeline';

export default async function ExperienceSection() {
    const snapshot = await db.collection("experience").get();
    const experiences = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return (<>
        <SectionHeading heading={"Experience"} id='experience' />
        <Timeline experiences={experiences} />
    </>
    )
}