<script>
	import { afterNavigate } from '$app/navigation';
	import Auth from '$lib/components/glue/Auth.svelte';
	import MobileDrawerContent from '$lib/components/glue/MobileDrawerContent.svelte';
	import { APP_NAME, IS_BETA, PUBLIC_NAVS } from '$lib/glue/config';
	import './app.css';
	import FeedbackModal from './FeedbackModal.svelte';
	import TrackWidth from './TrackWidth.svelte';

	let topAnchor;

	afterNavigate(() => {
		if (topAnchor) {
			topAnchor.scrollIntoView();
		}
	});
</script>

<TrackWidth />

<div class="w-screen">
	<div class="drawer">
		<!-- mobile nav: invisible drawer toggle -->
		<input id="drawer-mobile-nav" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center">
			<div bind:this={topAnchor} />

			<div class="relative w-full max-w-4xl p-4 md:pl-6">
				<!-- body content -->
				<div class="min-h-[90vh]">
					<slot />
				</div>

				<!-- footer -->
				<footer class="footer footer-center py-8 text-base-content">
					<div>
						<p>{APP_NAME} © 2023</p>
					</div>
				</footer>

				<!-- feedback -->
				<FeedbackModal />
			</div>
		</div>

		<!-- mobile nav: drawer content -->
		<MobileDrawerContent />
	</div>
</div>
