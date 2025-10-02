import { db } from '@/lib/firebaseAdmin';
import ProjectDetails from '@/app/components/ProjectDetails/ProjectDetails';
export default async function ProjectPage({ params }) {
    const { projectname } = await params ?? {};

    if (!projectname) return <div>No project specified</div>;

    function decodeSpace(encoded) {
        let decoded = decodeURIComponent(encoded);
        decoded = decoded.replace(/\+/g, ' ');
        return decoded;
    }
    const snapshot = await db
        .collection('project')
        .where('name', '==', decodeSpace(projectname))
        .get();

    if (snapshot.empty) return <div>Project not found</div>;

    const project = snapshot.docs[0].data();

    return <ProjectDetails project={project} />;
}
