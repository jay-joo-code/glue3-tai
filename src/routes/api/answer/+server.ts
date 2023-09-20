import { OPENAI_API_KEY } from '$env/static/private';
import { OpenAIStream } from '$lib/util/OpenAIStream';
import sourcesToPrompt from '$lib/util/sourcesToPrompt';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { messages, sources } = await request.json();
		const query = messages[messages.length - 1].content;
		const prompt = sourcesToPrompt({ sources, query });
		const stream = await OpenAIStream(prompt, OPENAI_API_KEY);
		return new Response(stream);
	} catch (error) {
		console.log('error', error);
		return json(error);
	}
}
