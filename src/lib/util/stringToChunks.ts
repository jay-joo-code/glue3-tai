import { encode } from 'gpt-3-encoder';

export default function chunks(content: string): string[] {
	const CHUNK_SIZE = 200;
	const chunks = [];

	if (encode(content).length > CHUNK_SIZE) {
		const split = content.split('. ');
		let chunkText = '';

		for (let i = 0; i < split.length; i++) {
			const sentence = split[i];
			const sentenceTokenLength = encode(sentence);
			const chunkTextTokenLength = encode(chunkText).length;

			if (chunkTextTokenLength + sentenceTokenLength.length > CHUNK_SIZE) {
				chunks.push(chunkText);
				chunkText = '';
			}

			if (sentence[sentence.length - 1]?.match(/[a-z0-9]/i)) {
				chunkText += sentence + '. ';
			} else {
				chunkText += sentence + ' ';
			}
		}

		chunks.push(chunkText.trim());
	} else {
		chunks.push(content.trim());
	}
	return chunks;
}
