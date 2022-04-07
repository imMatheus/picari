import { db } from '$lib/firebase/config';
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
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

export const createUserWithDiscord = async (user, token) => {
	const createdUser = await createUserWithEmailAndPassword(auth, user.email, token.access_token);
	const userRef = doc(db, 'users', createdUser.user.uid);
	await setDoc(userRef, {
		discord_id: user.id,
		email: user.email,
		username: user.username,
		discriminator: user.discriminator,
		avatar: user.avatar,
		createdAt: new Date().toISOString()
	});
	return createdUser;
};

export const logInWithDiscord = async (user, token) => {
	return await signInWithEmailAndPassword(auth, user.email, token.access_token);
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
