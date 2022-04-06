import { getToken, getUser } from '../../lib/functions/discord';
import { db, auth } from '../../lib/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, query, where, getDocs, collection } from 'firebase/firestore';

export async function get(req) {
	let user, token;
	try {
		const code = req.url.searchParams.get('code');
		token = await getToken(code);
		user = await getUser(token);
	} catch (err) {
		return {
			status: 500,
			body: {
				error: 'Internal server error'
			}
		};
	}

	if (!user.id)
		return {
			status: 400,
			body: {
				error: 'User could not be fetched'
			}
		};

	if (!user.email)
		return {
			status: 400,
			body: {
				error: 'User does not have a email'
			}
		};

	const usersRef = collection(db, 'users');
	const q = query(usersRef, where('discord_id', '==', user.id));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		const createdUser = await createUserWithEmailAndPassword(auth, user.email, token.access_token);
		const userRef = doc(usersRef, createdUser.user.uid);
		await setDoc(userRef, {
			discord_id: user.id,
			email: user.email,
			username: user.username,
			discriminator: user.discriminator,
			avatar: user.avatar,
			createdAt: new Date().toISOString()
		});
		return {
			status: 200,
			body: {
				message: 'Created user successfully',
				user: createdUser
			}
		};
	} else {
		const loggedInUser = await signInWithEmailAndPassword(auth, user.email, token.access_token);
		return {
			status: 200,
			body: {
				message: 'Signed in successfully',
				loggedInUser
			}
		};
	}
}
