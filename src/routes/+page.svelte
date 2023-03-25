<script lang="ts">
	import Aside from '$lib/components/glue/Aside.svelte';
	import Main from '$lib/components/glue/Main.svelte';
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import TextInput from '$lib/components/glue/TextInput.svelte';
	import type { IChat } from '$lib/types/chat';
	import axios from 'axios';

	let messages: IChat[] = [
		{
			role: 'system',
			content: 'Your name is TAI. You are an AI teaching assistant for Cornell University students'
		}
	];
	let content: string = '';

	const sendMessage = async () => {
		messages = [
			...messages,
			{
				role: 'user',
				content
			}
		];
		content = '';

		const { data } = await axios.post('/api/chat', {
			messages
		});

		if (data?.success) {
			messages = [...messages, data?.response];
		}
	};
</script>

<PageContainer title="Home" layout="aside-main">
	<Main>
		<form on:submit={sendMessage} class="flex items-center space-x-3">
			<TextInput placeholder="Send a message" bind:value={content} />
			<button class="btn-primary btn">Send</button>
		</form>
		<div class="mt-4 space-y-3 px-1">
			{#each messages?.filter((message) => message?.role !== 'system') as message}
				<div>
					<p class="text-sm text-base-content/70">{message?.role}</p>
					<p class="text-md whitespace-pre-line">{message?.content}</p>
				</div>
			{/each}
		</div>
	</Main>
	<Aside>aside</Aside>
</PageContainer>
