import { db } from '../firebase/config';
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth as adminAuth } from '../firebase/admin';

const DISCORD_API_URL = 'https://discordapp.com/api';

export const getToken = async (code: string) =>
	await (
		await fetch(`${DISCORD_API_URL}/oauth2/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: import.meta.env.VITE_DISCORD_CLIENT_ID as string,
				client_secret: import.meta.env.VITE_DISCORD_OAUTH_SECRET as string,
				grant_type: 'authorization_code' as string,
				redirect_uri: (import.meta.env.VITE_BASE_URL + '/discord') as string,
				code: code as string
			})
		})
	).json();

export const getUser = async (token: any) =>
	await (
		await fetch(`${DISCORD_API_URL}/users/@me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		})
	).json();

export const getAuthUrl = (scope: any) =>
	`${DISCORD_API_URL}/oauth2/authorize?client_id=${
		import.meta.env.VITE_DISCORD_CLIENT_ID
	}&redirect_uri=${encodeURIComponent(
		import.meta.env.VITE_BASE_URL + '/discord'
	)}&response_type=code&scope=${encodeURIComponent(scope.join(' '))}`;

export const createUserWithDiscord = async (user) => {
	const createdUser = await adminAuth.createUser({
		uid: user.id,
		email: user.email
	});
	const userRef = doc(db, 'users', createdUser.uid);
	await setDoc(userRef, {
		discord_id: user.id,
		email: user.email,
		username: user.username,
		discriminator: user.discriminator,
		avatar: user.avatar,
		createdAt: new Date().toISOString()
	});
	return await adminAuth.createCustomToken(user.id);
};

export const logInWithDiscord = async (user) => {
	return await adminAuth.createCustomToken(user.id);
};

export const getUserByDiscordId = async (discordId: string) => {
	const usersRef = collection(db, 'users');
	const q = query(usersRef, where('discord_id', '==', discordId));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) {
		return null;
	}
	return querySnapshot.docs[0].data();
};

export const logOut = async () => {
	console.log('lol');
};
