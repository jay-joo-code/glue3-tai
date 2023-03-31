import processText from '$lib/util/reduceTokens';
import snoowrap from 'snoowrap';
import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT } from '$env/static/private';

async function fetchAccessToken() {
	const response = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`)
		},
		body: 'grant_type=client_credentials'
	});
	const data = await response.json();
	return data.access_token;
}

export default async function fetchRelevantPostsAndComments(query, n = 5) {
	// n = the number of top comments per post to fetch
	try {
		const subreddit = 'Cornell';
		const accessToken = await fetchAccessToken();
		const r = new snoowrap({
			userAgent: REDDIT_USER_AGENT,
			accessToken
		});

		const searchResults = await r.search({
			query: processText(query),
			subreddit,
			sort: 'relevance',
			time: 'all'
		});

		const postsWithComments = await Promise.all(
			searchResults?.slice(0, 4).map(async (post) => {
				const comments = await post.expandReplies({ limit: n, depth: 1 }).catch(() => []);

				return {
					title: post.title,
					id: post.id,
					url: post.url,
					selftext: post.selftext,
					comments: comments.comments.map((comment) => ({
						// ...comment
						id: comment.id,
						author: comment.author.name,
						body: comment.body,
						ups: comment.ups
					}))
				};
			})
		);

		return postsWithComments;
	} catch (error) {
		console.error('Error fetching posts and comments:', error);
	}
}
