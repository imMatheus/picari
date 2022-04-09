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
		const token = await logInWithDiscord(user);
		return {
			headers: {
				location: `/?token=${token}`
			},
			status: 302
		};
	} else {
		const token = await createUserWithDiscord(user);
		return {
			headers: {
				location: `/?token=${token}`
			},
			status: 302
		};
	}
}
