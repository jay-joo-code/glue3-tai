import { COLLEGE } from '$lib/glue/config';
import endent from 'endent';
import reduceTokens from './reduceTokens';

export interface ISourcesToPrompt {
	sources: any[];
	query: string;
}
const sourcesToPrompt = ({ sources, query }: ISourcesToPrompt) => {
	const prompt = endent`I want you to act as GPT X, an AI assistant for ${COLLEGE} students. Provide a concise and accurate answer to the query "${query}". Use the provided sources if necessary. Cite sources as [1] or [2] or [3] after each sentence (not just the very end) (Ex: Correct: [1], Correct: [2][3], Incorrect: [1, 2]).

	${sources
		?.slice(0, 3)
		.map((source, idx) => `Source [${idx + 1}]:\n${reduceTokens(source.snippet)}`)
		.join('\n\n')}
	`;
	// return query;

	return prompt;
};

export default sourcesToPrompt;
