<script lang="ts">
	import { onDestroy } from 'svelte';
	import FeedCard from './FeedCard.svelte';
	import NoPosts from '../NoPosts.svelte';
	import Loader from '../Loader.svelte';
	import { db } from '$firebase';
	import { collection, query, limit, orderBy, where, onSnapshot } from 'firebase/firestore';
	import type { Post } from '../../types/Post';
	import FeedHeader from './FeedHeader.svelte';
	import { getStartOfToday } from '../../utils/getStartOfToday';

	const colRef = query(
		collection(db, 'posts'),
		limit(5),
		orderBy('createdAt', 'desc'),
		where('createdAt', '>', getStartOfToday())
	);

	let posts: Post[] = [];
	let loading = true;

	const unsubscirbe = onSnapshot(colRef, (snapshot) => {
		loading = true;
		posts = snapshot.docs.map((doc) => ({
			...(doc.data() as Post),
			id: doc.id
		}));
		loading = false;
	});

	onDestroy(unsubscirbe);
</script>

<div class="min-h-screen space-y-4">
	<!-- <button class="bg-red-300 p-2" on:click={addDocs}>add docs</button> -->
	<FeedHeader />

	{#if loading}
		<Loader />
	{:else if posts.length < 1}
		<NoPosts />
	{:else}
		{#each posts as post}
			<FeedCard {post} />
		{/each}
		<!-- <Loader /> -->
	{/if}
</div>
