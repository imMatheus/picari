<script lang="ts">
	import Feed from '$components/feed/Feed.svelte';
	import { onMount } from 'svelte';
	import Loader from '$components/Loader.svelte';
	import { auth } from '$lib/firebase/config';
	import { signInWithCustomToken } from 'firebase/auth';

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
			return;
		}

		//get get parameters token
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		if (token) {
			signInWithCustomToken(auth, token)
				.then((val) => {
					console.log('signed in', val);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
</script>

{#await cameraSupported}
	<div class="h-96">
		<Loader />
	</div>
{:then}
	<Feed />
{:catch}
	<p>Camera is not supported on your device</p>
{/await}
