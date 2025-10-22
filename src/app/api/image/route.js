import { bucket } from '@/lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const path = searchParams.get('path');

        if (!path) {
            return new NextResponse('Path is required', { status: 400 });
        }

        const file = bucket.file(path);
        const [exists] = await file.exists();

        if (!exists) {
            return new NextResponse('Image not found', { status: 404 });
        }

        const [buffer] = await file.download();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'image/webp',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error) {
        console.error('Error serving image:', error);
        return new NextResponse('Error serving image', { status: 500 });
    }
}