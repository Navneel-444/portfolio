import { db, bucket } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const snapshot = await db.collection("project").get();
        const projects = snapshot.docs.map(doc => ({
            id: doc.id,
            desc: doc.data().desc,
            name: doc.data().name,
            imagePath: doc.data().imagePath
        }));

        const projectsWithURLs = await Promise.all(
            projects.map(async (p) => {
                try {
                    let imageUrl = null;
                    if (p.imagePath) {
                        const file = bucket.file(p.imagePath);
                        const [url] = await file.getSignedUrl({
                            action: 'read',
                            expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
                        }).catch(() => [null]);
                        imageUrl = url;
                    }

                    return {
                        ...p,
                        imageUrl,
                        hasError: !imageUrl
                    };
                } catch (error) {
                    console.error(`Error loading image for project ${p.name}:`, error);
                    return {
                        ...p,
                        imageUrl: null,
                        hasError: true
                    };
                }
            })
        );

        return NextResponse.json(projectsWithURLs, {
            status: 200,
            next: { revalidate: 3600 },
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}
