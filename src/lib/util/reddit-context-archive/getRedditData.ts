import Snoowrap from 'snoowrap';
import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT } from '$env/static/private';
import processText from './processText';

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

export default async function getRedditData(limit = 1) {
	try {
		const accessToken = await fetchAccessToken();
		const r = new Snoowrap({
			userAgent: REDDIT_USER_AGENT,
			accessToken
			// clientId: REDDIT_CLIENT_ID,
			// clientSecret: REDDIT_CLIENT_SECRET
			// refreshToken: 'YOUR_REFRESH_TOKEN',
		});

		const subredditName = 'Cornell';
		const subreddit = await r.getSubreddit(subredditName);
		const topPosts = await subreddit.getTop({ limit });
		const dataStrings = [];

		for (const post of topPosts) {
			if (post.score > 1) {
				let postText = `post: ${post.title}. ${post.selftext}. `;

				const comments = await post.expandReplies({ limit: 3, depth: 1 });
				for (const comment of comments.comments) {
					if (comment?.score >= 1) {
						postText += ` comment: ${comment?.body}. `;
					}
				}
				const processedText = processText(postText);

				dataStrings?.push(postText);
				dataStrings?.push(processedText);
			}
		}

		return dataStrings;
	} catch (error) {
		console.error(`Error fetching subreddit data: ${error.message}`);
	}
}
