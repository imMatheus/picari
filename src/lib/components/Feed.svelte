<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import FeedCard from './FeedCard.svelte';
	import NoPosts from './NoPosts.svelte';
	import Loader from './Loader.svelte';
	import { collection, query, limit, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';
	import { db } from '$firebase';
	import type { Post } from '../types/Post';
	import faker from 'faker';

	const colRef = query(collection(db, 'posts'), limit(5));

	let posts: Post[] = [];
	let loading = true;

	// logs posts every time value changes
	$: console.log(posts);

	const unsubscirbe = onSnapshot(colRef, (snapshot) => {
		loading = true;
		posts = snapshot.docs.map((doc) => ({
			...(doc.data() as Post),
			id: doc.id
		}));
		loading = false;
	});

	onDestroy(unsubscirbe);

	async function addDocs() {
		for (let i = 0; i < 50; i++) {
			const post: Omit<Post, 'id'> = {
				authorId: faker.datatype.uuid(),
				authorName: faker.name.findName(),
				authorImg: faker.image.imageUrl(),
				createdAt: Timestamp.fromDate(faker.date.past()),
				authorLocation: faker.address.city() + ', ' + faker.address.country(),
				imgUrl: faker.image.nightlife(),
				reactions: {
					congratulations: Array.from({ length: Math.ceil(Math.random() * 200) }, () =>
						faker.datatype.uuid()
					),
					heart: Array.from({ length: Math.ceil(Math.random() * 200) }, () =>
						faker.datatype.uuid()
					),
					laughing: Array.from({ length: Math.ceil(Math.random() * 200) }, () =>
						faker.datatype.uuid()
					),
					swag: Array.from({ length: Math.ceil(Math.random() * 200) }, () => faker.datatype.uuid()),
					thumbsUp: Array.from({ length: Math.ceil(Math.random() * 200) }, () =>
						faker.datatype.uuid()
					),
					thumbsDown: Array.from({ length: Math.ceil(Math.random() * 200) }, () =>
						faker.datatype.uuid()
					)
				}
			};
			await addDoc(collection(db, 'posts'), post);
		}
	}
</script>

<div class="min-h-screen space-y-4 border-x border-x-gray-500 dark:border-x-gray-600">
	<!-- <button class="bg-red-300 p-2" on:click={addDocs}>add docs</button> -->
	<div
		class="sticky top-0 z-50 border-b border-b-gray-500 bg-gray-50 p-3 dark:border-b-gray-600 dark:bg-[#0C111C]"
	>
		<h2 class="text-xl font-bold">Today</h2>
	</div>

	{#if loading}
		<Loader />
	{:else if posts.length < 1}
		<NoPosts />
	{:else}
		{#each posts as post}
			<FeedCard {post} />
		{/each}
		<Loader />
	{/if}
</div>
