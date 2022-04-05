export async function get(req) {
	console.log(req);
	return {
		status: 302,
		headers: {
			location:
				'https://discord.com/api/oauth2/authorize?client_id=960916697244635166&redirect_uri=https%3A%2F%2Fb876-31-208-143-89.ngrok.io%2Fdiscord&response_type=code&scope=identify%20email'
		}
	};
}
