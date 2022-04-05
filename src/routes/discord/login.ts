export async function get(req) {
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	return {
		status: 302,
		headers: {
			location: `https://discord.com/api/oauth2/authorize?client_id=960916697244635166&redirect_uri=${encodeURIComponent(
				BASE_URL + '/discord'
			)}&response_type=code&scope=identify%20email`
		}
	};
}
