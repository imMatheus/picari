<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import FeedCard from './FeedCard.svelte';
	import Loader from './Loader.svelte';
	import {
		collection,
		getDocs,
		doc,
		query,
		limit,
		addDoc,
		onSnapshot,
		Timestamp
	} from 'firebase/firestore';
	import { db } from '$firebase';
	import type { Post } from '../types/Post';
	import faker from 'faker';

	const colRef = query(collection(db, 'posts'), limit(4));

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
		for (let i = 0; i < 30; i++) {
			const post: Omit<Post, 'id'> = {
				authorId: faker.datatype.uuid(),
				authorName: faker.name.findName(),
				authorImg: faker.image.imageUrl(),
				createdAt: Timestamp.fromDate(faker.date.past()),
				authorLocation: faker.address.city(),
				imgUrl: faker.image.nightlife(),
				reactions: []
			};
			await addDoc(collection(db, 'posts'), post);
		}
	}

	console.log(faker.date.past());
</script>

<div class="space-y-6">
	<button class="bg-red-300 p-2" on:click={addDocs}>add docs</button>

	{#if loading}
		<Loader />
	{/if}

	{#each posts as post}
		<FeedCard {post} />
	{/each}
</div>
