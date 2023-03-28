import natural from 'natural';
import { removeStopwords } from 'stopword';

// const stopwords = require('natural/lib/natural/util/stopwords').words;

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

export default function processText(text) {
	// Convert text to lowercase
	text = text.toLowerCase();

	// Tokenize the text
	const tokens = tokenizer.tokenize(text);

	// Remove stopwords
	const filteredTokens = removeStopwords(tokens);

	// Stem the tokens
	// const stemmedTokens = filteredTokens.map((token) => stemmer.stem(token));

	// Join the stemmed tokens back into a single string
	const preprocessedText = filteredTokens.join(' ');

	return preprocessedText;
	// return text.toLowerCase();
}
