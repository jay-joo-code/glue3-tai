<script lang="ts">
	import Aside from '$lib/components/glue/Aside.svelte';
	import Main from '$lib/components/glue/Main.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import TextInput from '$lib/components/glue/TextInput.svelte';
	import { COLLEGE } from '$lib/glue/config';
	import IconSearch from '$lib/icons/glue/IconSearch.svelte';
	import IconUpArrow from '$lib/icons/glue/IconUpArrow.svelte';
	import type { IChat } from '$lib/types/chat';
	import axios from 'axios';

	let messages: IChat[] = [];
	let query: string = '';
	let sources = [];
	// let sources = [
	// 	{
	// 		kind: 'customsearch#result',
	// 		title: 'Login to Canvas',
	// 		htmlTitle: 'Login to <b>Canvas</b>',
	// 		link: 'https://www.canvas.net/login',
	// 		displayLink: 'www.canvas.net',
	// 		snippet:
	// 			"Enter your Email and we'll send you a link to change your password. Request Password. Back to Login. Need a Canvas Account? Click Here, It's Free!",
	// 		htmlSnippet:
	// 			'Enter your Email and we&#39;ll send you a link to change your password. Request Password. Back to Login. Need a <b>Canvas</b> Account? Click Here, It&#39;s Free!',
	// 		cacheId: 'mW5cUwLR2W8J',
	// 		formattedUrl: 'https://www.canvas.net/login',
	// 		htmlFormattedUrl: 'https://www.<b>canvas</b>.net/login',
	// 		pagemap: {
	// 			metatags: [
	// 				{
	// 					'theme-color': '#0374B5',
	// 					'apple-mobile-web-app-status-bar-style': 'black',
	// 					handheldfriendly: 'True',
	// 					viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
	// 					'apple-mobile-web-app-capable': 'yes'
	// 				}
	// 			]
	// 		}
	// 	},
	// 	{
	// 		kind: 'customsearch#result',
	// 		title: 'Canvas by Instructure',
	// 		htmlTitle: '<b>Canvas</b> by Instructure',
	// 		link: 'https://canvas.instructure.com/',
	// 		displayLink: 'canvas.instructure.com',
	// 		snippet:
	// 			"Enter your Email and we'll send you a link to change your password. Request Password. Back to Login. Need a Canvas Account? Click Here, It's Free!",
	// 		htmlSnippet:
	// 			'Enter your Email and we&#39;ll send you a link to change your password. Request Password. Back to Login. Need a <b>Canvas</b> Account? Click Here, It&#39;s Free!',
	// 		cacheId: 'KIwsLJUbwFoJ',
	// 		formattedUrl: 'https://canvas.instructure.com/',
	// 		htmlFormattedUrl: 'https://<b>canvas</b>.instructure.com/',
	// 		pagemap: {
	// 			metatags: [
	// 				{
	// 					'theme-color': '#0374B5',
	// 					'apple-mobile-web-app-status-bar-style': 'black',
	// 					handheldfriendly: 'True',
	// 					viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
	// 					'apple-mobile-web-app-capable': 'yes'
	// 				}
	// 			]
	// 		}
	// 	},
	// 	{
	// 		kind: 'customsearch#result',
	// 		title: 'Canvas Credit Union | Local Banking in Colorado',
	// 		htmlTitle: '<b>Canvas</b> Credit Union | Local Banking in Colorado',
	// 		link: 'https://www.canvas.org/',
	// 		displayLink: 'www.canvas.org',
	// 		snippet:
	// 			'At Canvas, we believe that banking is about so much more than just opening an account. ... Manage your money on the go, any time, with our Canvas App.',
	// 		htmlSnippet:
	// 			'At <b>Canvas</b>, we believe that banking is about so much more than just opening an account. ... Manage your money on the go, any time, with our <b>Canvas</b> App.',
	// 		cacheId: 'rChxxlG8T7gJ',
	// 		formattedUrl: 'https://www.canvas.org/',
	// 		htmlFormattedUrl: 'https://www.<b>canvas</b>.org/',
	// 		pagemap: {
	// 			metatags: [
	// 				{
	// 					'og:image': 'https://cdn.canvas.org/files/content/imgs/social-header.jpg',
	// 					'theme-color': '#000000',
	// 					'og:type': 'website',
	// 					viewport: 'width=device-width,initial-scale=1,shrink-to-fit=no',
	// 					author: 'CCU\\Brendan.Steele',
	// 					'og:title': 'Canvas Credit Union',
	// 					'og:url': 'https://www.canvas.org',
	// 					'og:description':
	// 						'Canvas Credit Union offers credit union services in Colorado. Offering personal & business savings, checking accounts, & loans at great interest rates. Visit us!'
	// 				}
	// 			],
	// 			cse_image: [
	// 				{
	// 					src: 'https://cdn.canvas.org/files/content/imgs/social-header.jpg'
	// 				}
	// 			]
	// 		}
	// 	}
	// ];

	// let answer =
	// 	'Canvas is a learning management system (LMS) that is used by many colleges and universities to deliver online courses.';
	let answer = '';

	let continueQuery = '';

	const createSearch = async () => {
		answer = '';
		sources = [];

		const response = await axios.post('/api/sources', {
			query,
			limit: 3
		});
		sources = response?.data?.sources;
		console.log('sources', sources);

		const answerResponse = await fetch('/api/answer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, sources })
		});

		if (!answerResponse.ok) {
			throw new Error(answerResponse.statusText);
		}

		const data = answerResponse.body;

		if (!data) return;

		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);
			answer += chunkValue;
		}
	};
</script>

<PageContainer title="Home">
	<Main>
		<div class="flex min-h-[60vh] w-full flex-col justify-center">
			<div class="flex w-full flex-col items-center">
				<h2 class="text-5xl font-semibold text-base-content/80">
					GPT <span
						class="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text  font-bold text-transparent"
						>X</span
					>
				</h2>
				<form
					on:submit={createSearch}
					class="mt-8 flex w-full max-w-lg items-center space-x-3 rounded-full border border-base-content/50 px-3 py-1"
				>
					<TextInput
						placeholder="Send a message"
						class="border-0 bg-base-200 focus:outline-none"
						bind:value={query}
						autofocus
					/>
					<button class="btn-primary btn-sm btn rounded-full px-2 text-xl"><IconSearch /></button>
				</form>

				<!-- sources -->
				{#if sources?.length > 0}
					<div class="mt-4 max-w-lg rounded-2xl bg-base-100 p-4">
						<p class="text-sm font-semibold text-base-content/90">Google search results</p>
						<div class="mt-3 space-y-4">
							{#each sources?.slice(0, 2) as source, idx}
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
					</div>
				{/if}

				<!-- section: GPT X -->
				{#if answer?.length > 0}
					<div class="mt-4 w-full max-w-lg rounded-2xl bg-base-100 p-4">
						<!-- header -->
						<p class="text-sm font-bold text-base-content/90">
							GPT <span
								class="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text  font-bold text-transparent"
								>X</span
							>
						</p>

						<!-- answer -->
						<div class="mt-3">
							<p class="text-md whitespace-pre-line">{answer}</p>
						</div>

						<!-- continue the conversation input -->
						<form
							on:submit={createSearch}
							class="mt-8 flex w-full max-w-lg items-center space-x-3 rounded-full border border-base-content/50 px-3 py-1"
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
				<!-- messages -->
				<div class="mt-4 space-y-3 px-1">
					{#each messages?.filter((message) => message?.role !== 'system') as message}
						<div>
							<p class="text-sm text-base-content/70">{message?.role}</p>
							<p class="text-md whitespace-pre-line">{message?.content}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Main>
</PageContainer>
