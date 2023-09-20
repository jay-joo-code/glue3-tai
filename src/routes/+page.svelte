<script lang="ts">
	import Main from '$lib/components/glue/Main.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import TextInput from '$lib/components/glue/TextInput.svelte';
	import IconDownKarat from '$lib/icons/glue/IconDownKarat.svelte';
	import IconSearch from '$lib/icons/glue/IconSearch.svelte';
	import IconUpArrow from '$lib/icons/glue/IconUpArrow.svelte';
	import { DUMMY_MESSAGES, DUMMY_MESSAGES_SLOPE_DAY } from '$lib/util/dummyData';
	import axios from 'axios';

	let messages = [];
	let sources = [];
	let newQuery: string = '';
	let searchResults = [];
	let isExpandSources = false;
	let continueQuery = '';
	$: displaySearchResults = isExpandSources ? searchResults : searchResults?.slice(0, 2);
	$: console.log('messages', messages);
	$: console.log('sources', sources);
	messages = DUMMY_MESSAGES_SLOPE_DAY;
	// let searchResults = DUMMY_SOURCES;

	const search = async () => {
		const query = searchResults?.length === 0 ? newQuery : continueQuery;
		continueQuery = '';
		const response = await axios.post('/api/sources', {
			query,
			sourceLimit: 3
		});

		const newSources = response?.data?.sources;
		if (searchResults?.length === 0) searchResults = newSources;

		messages = [
			...messages,
			{
				role: 'user',
				content: query
			}
		];
		sources = [...sources, []];

		const answerResponse = await fetch('/api/answer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ messages, sources: newSources })
		});

		if (!answerResponse.ok) {
			throw new Error(answerResponse.statusText);
		}

		const data = answerResponse.body;

		if (!data) return;

		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;
		messages = [
			...messages,
			{
				role: 'assistant',
				content: ''
			}
		];
		sources = [...sources, newSources];

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);
			messages[messages?.length - 1].content += chunkValue;
		}
	};
</script>

<PageContainer title="Home">
	<Main>
		<div class="flex w-full flex-col justify-center {messages?.length === 0 && 'min-h-[70vh]'}">
			<div class="flex w-full flex-col items-center">
				{#if messages?.length === 0}
					<h2 class="text-5xl font-semibold text-base-content/80">
						GPT <span
							class="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text  font-bold text-transparent"
							>X</span
						>
					</h2>
				{/if}
				<form
					on:submit={() => {
						searchResults = [];
						messages = [];
						continueQuery = '';
						sources = [];
						search();
					}}
					class="sticky top-16 mt-8 flex w-full max-w-2xl items-center space-x-3 rounded-full border border-base-content/50 px-3 py-1"
				>
					<TextInput
						placeholder="Send a message"
						class="border-0 bg-base-200 focus:outline-none"
						bind:value={newQuery}
						autofocus
					/>
					<button class="btn-primary btn-sm btn rounded-full px-2 text-xl"><IconSearch /></button>
				</form>

				<!-- section: google search results -->
				{#if searchResults?.length > 0}
					<div class="mt-8 max-w-2xl rounded-2xl bg-base-100 p-4">
						<p class="text-sm font-semibold text-base-content/90">Google search results</p>
						<div class="mt-3 space-y-4">
							{#each displaySearchResults as source, idx}
								<div class="">
									<a class="" href={source?.link} target="_blank" rel="noreferrer">
										<div class="flex items-center">
											<img
												src="https://www.google.com/s2/favicons?sz=64&domain_url={source?.link}"
												alt="source favicon"
												class="h-4 w-4"
											/>
											<p class="ml-2 text-sm font-medium">{source?.title}</p>
										</div>
										<p class="mt-1 text-xs text-base-content/70">{source?.snippet}</p>
									</a>
								</div>
							{/each}
						</div>

						<!-- see more -->
						{#if !isExpandSources}
							<div class="relative flex justify-center">
								<button
									class="btn-xs btn absolute top-1 rounded-full pr-1 pl-3"
									on:click={() => {
										isExpandSources = true;
									}}>more <span class="text-lg"><IconDownKarat /></span></button
								>
							</div>
						{/if}
					</div>
				{/if}

				<!-- section: GPT X -->
				{#if messages?.length > 0}
					<div class="mt-4 w-full max-w-2xl rounded-2xl bg-base-100 p-4">
						<!-- header -->
						<p class="text-sm font-bold text-base-content/90">
							GPT <span
								class="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text  font-bold text-transparent"
								>X</span
							>
						</p>

						<!-- messages -->
						{#each messages?.slice(1) as message, idx}
							<div class="mt-3">
								<p class="text-xs text-base-content/70">{message?.role}</p>
								<p class="text-md mt-1 whitespace-pre-line">{message?.content}</p>
								{#if sources[idx + 1]?.length > 0}
									<div class="mt-2 flex flex-wrap items-center gap-y-2 space-x-2">
										{#each sources[idx + 1] as source, idx}
											<a href={source?.link} target="_blank" rel="noreferrer">
												<button class="btn-xs btn flex items-center rounded-full">
													<div class="badge badge-sm bg-base-content/70 px-1 text-base-100">
														{idx + 1}
													</div>
													<img
														src="https://www.google.com/s2/favicons?sz=64&domain_url={source?.link}"
														alt="source favicon"
														class="ml-2 h-4 w-4"
													/>
													<p class="ml-2 text-sm font-medium">{source?.title?.substr(0, 20)}</p>
												</button>
											</a>
										{/each}
									</div>
								{/if}
							</div>
						{/each}

						<!-- continue the conversation input -->
						<form
							on:submit={() => {
								search();
							}}
							class="mt-8 flex w-full max-w-2xl items-center space-x-3 rounded-full border border-base-content/50 px-3 py-1"
						>
							<TextInput
								placeholder="Continue the conversation"
								class="input-sm border-0 focus:outline-none"
								bind:value={continueQuery}
								autofocus
							/>
							<button class="btn-primary btn-xs btn rounded-full px-1 text-xl"
								><IconUpArrow /></button
							>
						</form>
					</div>
				{/if}
			</div>
		</div>
	</Main>
</PageContainer>
