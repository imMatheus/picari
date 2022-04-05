export async function get(req) {
	const code = req.url.searchParams.get('code');
	const res = await (
		await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: import.meta.env.VITE_DISCORD_CLIENT_ID.toString(),
				client_secret: import.meta.env.VITE_DISCORD_OAUTH_SECRET.toString(),
				grant_type: 'authorization_code',
				redirect_uri: import.meta.env.VITE_BASE_URL + '/discord',
				code: code.toString()
			})
		})
	).json();

	const userData = await (
		await fetch('https://discord.com/api/oauth2/@me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${res.access_token}`
			}
		})
	).json();

	// if (!userData.user.email)
	// 	return {
	// 		status: 400,
	// 		body: {
	// 			error: 'Discord account not verified by email'
	// 		}
	// 	};

	return {
		status: 200,
		body: await userData
	};
}
