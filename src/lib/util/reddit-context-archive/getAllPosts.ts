import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT } from '$env/static/private';

async function fetchAccessToken(clientId, clientSecret) {
	const response = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`)
		},
		body: 'grant_type=client_credentials'
	});
	const data = await response.json();
	return data.access_token;
}

async function fetchSubredditPosts(subreddit, accessToken, after = '', limit = 100) {
	const response = await fetch(
		`https://oauth.reddit.com/r/${subreddit}/hot?limit=${limit}&after=${after}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'User-Agent': REDDIT_USER_AGENT
			}
		}
	);
	const data = await response.json();
	return data;
}

const fetchComments = async (postId, accessToken) => {
	const response = await fetch(`https://oauth.reddit.com/r/all/comments/${postId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'User-Agent': 'my-app-name/1.0'
		}
	});

	const data = await response.json();
	console.log('data', data);
	return data[1].data.children.map((comment) => comment.data);
};

const getAllCommentsForPost = async (postId, accessToken) => {
	try {
		const comments = await fetchComments(postId, accessToken);
		return comments;
	} catch (error) {
		console.error('Error fetching comments:', error);
	}
};

export default async function getAllSubredditPosts() {
	const subreddit = 'Cornell';
	const clientId = REDDIT_CLIENT_ID;
	const clientSecret = REDDIT_CLIENT_SECRET;

	const accessToken = await fetchAccessToken(clientId, clientSecret);
	let posts = [];
	let after = '';

	do {
		const data = await fetchSubredditPosts(subreddit, accessToken, after);
		const promises = data.data.children?.map(async (post) => {
			const comments = await getAllCommentsForPost(post?.id, accessToken);
			// console.log('comments', comments);
			return {
				...post,
				comments
			};
		});
		const newPosts = await Promise.all(promises);
		posts = posts.concat(newPosts);
		after = data.data.after;
	} while (after && posts?.length < 50);

	return posts.map((post) => post.data);
}
