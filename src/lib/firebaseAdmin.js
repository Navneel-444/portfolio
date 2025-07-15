import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64) {
    // Production on Vercel
    const decoded = Buffer.from(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64,
        'base64'
    ).toString('utf8');
    try {
        serviceAccount = JSON.parse(decoded);
    } catch (error) {
        throw new Error('Failed to parse decoded Firebase service account JSON.');
    }
} else {
    // Local development
    try {
        serviceAccount = await import('../../serviceAccountKey.json', {
            assert: { type: 'json' }
        }).then((mod) => mod.default);
    } catch (error) {
        throw new Error(
            'No service account found. Set FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 or provide serviceAccountKey.json locally.'
        );
    }
}

const app = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount),
    });

const db = getFirestore(app);

export { db };
