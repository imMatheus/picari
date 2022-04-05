<script lang="ts">
	import Feed from '$components/Feed.svelte';
	import { onMount } from 'svelte';
	import Loader from '$components/Loader.svelte';

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
	<div class="h-96 bg-red-500">
		<Loader />
	</div>
{:then isCameraSupported}
	{#if isCameraSupported}
		<div class="px-4">
			<div class="mx-auto max-w-xl text-gray-900">
				<Feed />
			</div>
		</div>
	{:else}
		<p>Camera is not supported on your device</p>
	{/if}
{/await}
