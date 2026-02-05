import { db } from '@/lib/firebaseAdmin.js';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const snapshot = await db.collection("experience").get();
        const experiences = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(experiences, {
            status: 200,
            next: { revalidate: 3600 },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch experiences' },
            { status: 500 }
        );
    }
}
