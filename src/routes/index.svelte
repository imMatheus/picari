<script lang="ts">
	import Feed from '$components/Feed.svelte';
	import { onMount } from 'svelte';

	let resolveCameraSupported;
	let cameraSupported = new Promise(function (resolve) {
		resolveCameraSupported = resolve;
	});

	onMount(() => {
		resolveCameraSupported('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices);
		navigator.mediaDevices.getUserMedia({ video: true });
	});
</script>

{#await cameraSupported}
	<p>Loading ...</p>
{:then isCameraSupported}
	{#if isCameraSupported}
		<div class="mx-auto max-w-3xl p-3 text-gray-900">
			<Feed />
		</div>
	{:else}
		<p>Camera is not supported on your device</p>
	{/if}
{/await}

<style>
</style>
