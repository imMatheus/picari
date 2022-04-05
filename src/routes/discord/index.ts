export async function get(req) {
	let user;
	try {
		const code = req.url.searchParams.get('code');
		const token = await (
			await fetch('https://discord.com/api/oauth2/token', {
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

		user = await (
			await fetch('https://discord.com/api/users/@me', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token.access_token}`
				}
			})
		).json();
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
		body: user
	};
}
