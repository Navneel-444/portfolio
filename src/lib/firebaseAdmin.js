import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const { getStorage } = require('firebase-admin/storage');

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64) {
    // Production environment (Vercel)
    try {
        const decoded = Buffer.from(
            process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64,
            'base64'
        ).toString('utf8');
        serviceAccount = JSON.parse(decoded);
    } catch (error) {
        throw new Error('Failed to parse Firebase service account JSON from environment variable.');
    }
} else {
    // Local development
    try {
        serviceAccount = require('../../serviceAccountKey.json');
    } catch (error) {
        throw new Error('No service account found. In local development, ensure serviceAccountKey.json exists. In production, set FIREBASE_SERVICE_ACCOUNT_KEY_BASE64.');
    }
}
const firebaseStorageBucket = process.env.FIREBASE_STORAGE_BUCKET || serviceAccount.project_id + '.appspot.com';

const app = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount),
        storageBucket: firebaseStorageBucket
    });

const db = getFirestore(app);
const storage = getStorage(app);
const bucket = storage.bucket();

export { app, db, storage, bucket };