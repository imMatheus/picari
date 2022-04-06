import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY as string,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
	projectId: import.meta.env.VITE_PROJECT_ID as string,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
	appId: import.meta.env.VITE_APP_ID as string
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
