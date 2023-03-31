export default function reduceTokens(text) {
	// Lowercase the text
	text = text.toLowerCase();

	// Remove punctuation
	text = text.replace(/[^\w\s]/gi, '');

	// Tokenize the text
	let tokens = text.split(/\s+/);

	// Remove stop words
	let stopWords = [
		'a',
		'an',
		'the',
		'and',
		'but',
		'or',
		'because',
		'as',
		'if',
		'when',
		'what',
		'where',
		'which',
		'who',
		'whom',
		'whose',
		'is',
		'am',
		'are',
		'was',
		'were',
		'be',
		'been',
		'being',
		'have',
		'has',
		'had',
		'having',
		'do',
		'does',
		'did',
		'doing',
		'will',
		'would',
		'should',
		'can',
		'could',
		'may',
		'might',
		'must',
		'shall',
		'should',
		'ought',
		'to',
		'in',
		'on',
		'at',
		'to',
		'from',
		'by',
		'about',
		'into',
		'through',
		'during',
		'before',
		'after',
		'above',
		'below',
		'under',
		'up',
		'down',
		'in',
		'out',
		'off',
		'over',
		'under',
		'again',
		'further',
		'then',
		'once',
		'here',
		'there',
		'when',
		'where',
		'why',
		'how',
		'all',
		'any',
		'both',
		'each',
		'few',
		'more',
		'most',
		'other',
		'some',
		'such',
		'no',
		'nor',
		'not',
		'only',
		'own',
		'same',
		'so',
		'than',
		'too',
		'very',
		's',
		't',
		'can',
		'will',
		'just',
		'don',
		'should',
		'now'
	];
	tokens = tokens.filter((token) => !stopWords.includes(token));

	// Stem the text
	tokens = tokens.map((token) => {
		if (token.endsWith('ing')) {
			return token.slice(0, -3);
		} else if (token.endsWith('ly')) {
			return token.slice(0, -2);
		} else if (token.endsWith('ed')) {
			return token.slice(0, -2);
		} else {
			return token;
		}
	});

	// Join the tokens back into a string
	text = tokens.join(' ');

	return text;
}
