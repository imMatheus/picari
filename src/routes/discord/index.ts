import { getToken, getUser } from '../../lib/functions/discord';

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

	return {
		status: 200,
		body: token
	};
}
