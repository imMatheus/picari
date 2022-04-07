import { getAuthUrl } from '../../lib/functions/auth';

export async function get() {
	return {
		status: 302,
		headers: {
			location: getAuthUrl(['identify', 'email'])
		}
	};
}
