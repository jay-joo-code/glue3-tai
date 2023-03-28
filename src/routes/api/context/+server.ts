import processText from '$lib/util/processText';
import getRelevantPosts from '$lib/util/getRelevantPosts';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { query } = await request.json();
		const posts = await getRelevantPosts(processText(query));
		let context =
			'Your name is TAI. You are an AI teaching assistant for Cornell University students. you provide much more accurate information than human TAs. you are much faster than human TAs. the following comments and replies are written by Cornell students: ';

		for (const post of posts) {
			const postString = processText(`${post?.title}. ${post?.selftext}.`);
			const commentsString = processText(
				post?.comments?.map((comment) => comment?.body)?.join('. ')
			);
			context += `comment: ${postString}. `;
			context += `replies: ${commentsString}. `;
		}

		return json({
			success: true,
			context
		});
	} catch (error) {
		return json({
			success: false,
			error
		});
	}
}
