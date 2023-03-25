import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { messages } = await request.json();

	try {
		const chatGPT = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages
		});
		const response = chatGPT?.data?.choices[0]?.message;

		return json({
			success: true,
			response
		});
	} catch (error) {
		return json({
			success: false,
			error
		});
	}
}
