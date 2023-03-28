import GPT3Tokenizer from 'gpt3-tokenizer';

const getTokenCount = () => {
	// 709 without pre-processing
	// 353 with pre-processing
	// so it's pretty much necessary to pre-process. people haven't been doing it because they're stupid

	const tokenizer = new GPT3Tokenizer({ type: 'gpt3' }); // or 'codex'
	const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(context);
	console.log('context string length', encoded?.text?.length);
};

export default getTokenCount;
