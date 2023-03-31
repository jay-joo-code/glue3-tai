import { GOOGLE_API_KEY, GOOGLE_CX } from '$env/static/private';
import axios from 'axios';

export interface IgetSources {
	query: string;
	sourceLimit?: number;
}

const getSources = async ({ query, sourceLimit = 3 }: IgetSources) => {
	try {
		const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(
			query
		)}&num=${sourceLimit}`;
		const response = await axios.get(url);
		const results = response.data.items;

		return results || [];
	} catch (error) {
		console.log('Error fetching search results:', error.message);
	}
};

export default getSources;
