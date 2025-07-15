import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
} else {
    throw new Error('No Firebase service account credentials found.');
}

const app = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount),
    });

const db = getFirestore(app);

export { db };
