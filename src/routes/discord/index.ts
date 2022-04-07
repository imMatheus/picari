import {
	getToken,
	getUser,
	createUserWithDiscord,
	logInWithDiscord,
	getUserByDiscordId
} from '../../lib/functions/auth';

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

	if (await getUserByDiscordId(user.id)) {
		const loggedInUser = await logInWithDiscord(user, token);
		return {
			status: 200,
			body: {
				message: 'Signed in successfully',
				loggedInUser
			}
		};
	}
	const createdUser = await createUserWithDiscord(user, token);
	return {
		status: 200,
		body: {
			message: 'Created user successfully',
			createdUser
		}
	};
}
