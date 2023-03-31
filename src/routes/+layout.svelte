<script>
	import AppLayout from '$lib/components/glue/AppLayout.svelte';
	import { supabase } from '$lib/glue/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="bg-base-200">
	<AppLayout>
		<slot />
	</AppLayout>
</div>
