<script lang="ts">
	import Feed from '$components/Feed.svelte';
	import { onMount } from 'svelte';

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
	<p>Loading ...</p>
{:then}
	<div class="mx-auto max-w-3xl p-3 text-gray-900">
		<Feed />
	</div>
{:catch}
	<p>Camera is not supported on your device</p>
{/await}

<style>
</style>
