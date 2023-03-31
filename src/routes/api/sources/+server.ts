import getSources from '$lib/util/getSources';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { query, sourceLimit } = await request.json();
		const sources = await getSources({
			query,
			sourceLimit
		});

		return json({ sources });
	} catch (error) {
		console.log('error', error);
		return json(error);
	}
}
