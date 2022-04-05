export const getToken = async (code: string) => {
	return await (
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
};

export const getUser = async (token: any) => {
	return await (
		await fetch('https://discord.com/api/users/@me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		})
	).json();
};

export const getAuthUrl = (scope: any) => {
	return `https://discord.com/api/oauth2/authorize?client_id=${
		import.meta.env.VITE_DISCORD_CLIENT_ID
	}&redirect_uri=${encodeURIComponent(
		import.meta.env.VITE_BASE_URL + '/discord'
	)}&response_type=code&scope=${encodeURIComponent(scope.join(' '))}`;
};
