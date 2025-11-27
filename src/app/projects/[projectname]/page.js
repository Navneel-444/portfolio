import dynamic from 'next/dynamic';
import { db } from '@/lib/firebaseAdmin';
import CyberpunkLoader from '@/app/ui/Loader/Loader';

const ProjectContent = dynamic(() => import('./ProjectContent'), {
    loading: () => <CyberpunkLoader />,
    ssr: true,
});

export default async function ProjectPage({ params }) {
    const { projectname } = (params ?? {});

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
    const allProject = await db
        .collection('project')
        .select('name')
        .get()

    if (snapshot.empty) return <div>Project not found</div>;

    const project = snapshot.docs[0].data();
    const allProjects = allProject.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return <ProjectContent project={project} allProjects={allProjects} />;
}
