import { db } from '@/lib/firebaseAdmin';
import ProjectDetails from '@/app/components/ProjectDetails/ProjectDetails'; // server component

export default async function ProjectPage({ params }) {
    const { projectname } = params ?? {};

    if (!projectname) return <div>No project specified</div>;

    const snapshot = await db
        .collection('project')
        .where('name', '==', projectname)
        .get();

    if (snapshot.empty) return <div>Project not found</div>;

    const project = snapshot.docs[0].data();

    return <ProjectDetails project={project} />;
}
