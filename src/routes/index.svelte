<script lang="ts">
	import Feed from '$components/feed/Feed.svelte';
	import { onMount } from 'svelte';
	import Loader from '$components/Loader.svelte';
	import { auth } from '$lib/firebase/config';
	import { signInWithCustomToken } from 'firebase/auth';
	import { userStore } from '$lib/store';
	import { query, collection, where, getDocs } from 'firebase/firestore';
	import { db } from '../lib/firebase/config';

	const getUserByDiscordId = async (discordId: string) => {
		const usersRef = collection(db, 'users');
		const q = query(usersRef, where('discord_id', '==', discordId));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			return null;
		}
		return querySnapshot.docs[0].data();
	};

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

		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		if (token) {
			signInWithCustomToken(auth, token)
				.then(async (val) => {
					const user = await getUserByDiscordId(val.user.uid);
					console.log(user);
					userStore.set(user);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			const storedUser = localStorage.getItem('user');
			if (storedUser) {
				userStore.set(JSON.parse(storedUser));
			}
		}
		userStore.subscribe((val) => {
			localStorage.setItem('user', JSON.stringify(val));
		});
	});
</script>

{#await cameraSupported}
	<div class="h-96">
		<Loader />
		<div class="text-center">
			<h1 class="text-2xl">Loading content...</h1>
		</div>
	</div>
{:then}
	<Feed />
{:catch}
	<p>Camera is not supported on your device</p>
{/await}
