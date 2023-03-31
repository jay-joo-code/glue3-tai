import cheerio from 'cheerio';

async function fetchHtml(url: string): Promise<string> {
	try {
		const { data } = await axios.get(url);
		return data;
	} catch (error) {
		console.error(`Error fetching URL content: ${error.message}`);
		return '';
	}
}

export default async function getTextFromUrl(url: string): Promise<string> {
	const html = await fetchHtml(url);
	const $ = cheerio.load(html);
	$('script, style').remove();
	return $('body').text();
}
