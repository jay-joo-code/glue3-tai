<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { APP_NAME, IS_ENFORCE_CORNELL_EMAIL, IS_GOOGLE_AUTH_ONLY } from '$lib/glue/config';
	import { supabase } from '$lib/glue/supabaseClient';
	import IconGoogle from '$lib/icons/glue/IconGoogle.svelte';
	import IconLogout from '$lib/icons/glue/IconLogout.svelte';
	import IconMessage from '$lib/icons/glue/IconMessage.svelte';

	const PRIVATE_NAVS = [
		{
			label: 'Messages',
			path: '/chatrooms',
			icon: IconMessage
		}
	];
	let isForceCornellModalOpen = false;

	const signInWithGoogle = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		goto('/');
	};
</script>

<!-- modal: force cornell auth -->
<div class={`modal ${isForceCornellModalOpen && 'modal-open'}`} id="modal-force-cornell">
	<div class="modal-box w-11/12 max-w-sm">
		<h3 class="text-lg font-bold">Sign in with a @cornell.edu account</h3>
		<p class="py-4">
			You must sign in with a <span class="underline decoration-primary underline-offset-2"
				>Cornell email</span
			>
			to use {APP_NAME}.
		</p>
		<div class="flex justify-end space-x-2">
			<button
				class="btn-ghost btn"
				on:click={() => {
					isForceCornellModalOpen = false;
				}}>Close</button
			>
			<button type="button" class="btn-primary btn" on:click={signInWithGoogle}
				>Sign in again</button
			>
		</div>
	</div>
</div>

{#if $page?.data?.session}
	<!-- if authenticated, show avatar -->
	<div class="dropdown-end dropdown">
		<label tabindex="0" class="btn-ghost btn-square btn">
			<div class="placeholder avatar">
				<div
					class="w-8 rounded-full bg-neutral-focus text-neutral-content ring-2 ring ring-primary ring-offset-2 ring-offset-base-100"
				>
					{#if $page?.data?.session?.user?.user_metadata?.avatar_url}
						<img src={$page?.data?.session?.user?.user_metadata?.avatar_url} />
					{:else}
						<span class="text-sm">{$page?.data?.session?.user?.user_metadata?.name?.charAt(0)}</span
						>
					{/if}
				</div>
			</div>
		</label>
		<ul
			tabindex="0"
			class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
		>
			{#each PRIVATE_NAVS as nav}
				<li>
					<a href={nav.path}>
						<svelte:component this={nav.icon} />{nav.label}
					</a>
				</li>
			{/each}
			<li><button on:click={signOut}><IconLogout />Logout</button></li>
		</ul>
	</div>
{:else}
	<!-- else, show sign in button -->
	<button>
		<label for="modal-auth" class="btn-primary btn-sm btn">Get started</label>
	</button>
	<input type="checkbox" id="modal-auth" class="modal-toggle" />
	<label for="modal-auth" class="modal cursor-pointer">
		<label class="modal-box relative w-11/12 max-w-sm" for="">
			<div class="flex flex-col gap-3">
				<h3 class="mb-2 p-0 text-xl font-medium text-gray-900 dark:text-white">
					Sign in
					{#if IS_ENFORCE_CORNELL_EMAIL}
						<span
							>with your <span class="underline decoration-primary underline-offset-2"
								>Cornell email</span
							></span
						>
					{:else}
						<span>to {APP_NAME}</span>
					{/if}
				</h3>
				<p class="mb-2">
					Access all of the features by signing in and getting started with {APP_NAME}.
				</p>
				{#if IS_ENFORCE_CORNELL_EMAIL}
					<p class="mb-2">
						You must sign in with your <span class="underline decoration-primary underline-offset-2"
							>Cornell email</span
						>
						to sign into {APP_NAME}!
					</p>
				{/if}
				<button type="button" class="btn-primary btn gap-2" on:click={signInWithGoogle}
					><IconGoogle /> Sign in with {IS_ENFORCE_CORNELL_EMAIL
						? 'Cornell email'
						: 'Google'}</button
				>
			</div>
		</label>
	</label>
{/if}
