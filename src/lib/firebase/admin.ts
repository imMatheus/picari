import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const config = {
	credential: cert({
		projectId: import.meta.env.VITE_ADMIN_PROJECT_ID as string,
		clientEmail: import.meta.env.VITE_ADMIN_CLIENT_EMAIL as string,
		privateKey: import.meta.env.VITE_ADMIN_PRIVATE_KEY as string
	})
};
const app = getApps().length === 0 ? initializeApp(config) : getApp();
const auth = getAuth(app);

export { auth };
