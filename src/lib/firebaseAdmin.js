import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const { getStorage } = require('firebase-admin/storage');

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

const firebaseStorageBucket = process.env.FIREBASE_STORAGE_BUCKET;

if (!firebaseStorageBucket) {
    console.error('FIREBASE_STORAGE_BUCKET environment variable is not set!');
    process.exit(1);
}

const app = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount),
        storageBucket: firebaseStorageBucket
    });

const db = getFirestore(app);
const storage = getStorage(app);
const bucket = storage.bucket();
export { app, db, storage, bucket }