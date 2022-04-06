<script lang="ts">
	import Feed from '$components/Feed.svelte';
	import { onMount } from 'svelte';
	import Loader from '$components/Loader.svelte';

	let resolveCameraSupported, rejectCameraSupported;
	let cameraSupported = new Promise(function (resolve, reject) {
		resolveCameraSupported = resolve;
		rejectCameraSupported = reject;
	});

	onMount(() => {
		if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
			resolveCameraSupported();
			navigator.mediaDevices.getUserMedia({ video: true });
		} else {
			rejectCameraSupported();
		}
	});
</script>

{#await cameraSupported}
	<div class="h-96">
		<Loader />
	</div>
{:then}
	<div class="px-4">
		<div class="mx-auto max-w-xl">
			<Feed />
		</div>
	</div>
{:catch}
	<p>Camera is not supported on your device</p>
{/await}
