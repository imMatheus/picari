import { getAuthUrl } from '../../lib/functions/discord';

export async function get(req) {
	return {
		status: 302,
		headers: {
			location: getAuthUrl(['identify', 'email'])
		}
	};
}
