let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch (error) {
        throw new Error('Failed to parse Firebase service account JSON.');
    }
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
