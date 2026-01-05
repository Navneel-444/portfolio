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

        // Determine content type based on file extension
        const extension = path.split('.').pop().toLowerCase();
        const contentTypeMap = {
            'webp': 'image/webp',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'bmp': 'image/bmp',
            'ico': 'image/x-icon',
            'avif': 'image/avif',
        };
        const contentType = contentTypeMap[extension] || 'application/octet-stream';

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error) {
        console.error('Error serving image:', error);
        return new NextResponse('Error serving image', { status: 500 });
    }
}

export async function HEAD(request) {
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

        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD',
            }
        });
    } catch (error) {
        console.error('Error checking image:', error);
        return new NextResponse(error.message, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD',
            }
        });
    }
}