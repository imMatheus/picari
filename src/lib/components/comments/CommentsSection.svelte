<script lang="ts">
	import CommentCard from './Comment.svelte';
	import { onDestroy } from 'svelte';
	import { db } from '$firebase';
	import type { Comment } from '../../types/Comment';
	import Loader from '../Loader.svelte';

	import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

	export let postId: string;

	const colRef = query(collection(db, `posts/${postId}/comments`), orderBy('createdAt', 'desc'));

	let comments: Comment[] = [];
	let loading = true;

	const unsubscirbe = onSnapshot(colRef, (snapshot) => {
		loading = true;
		comments = snapshot.docs.map((doc) => ({
			...(doc.data() as Comment),
			id: doc.id
		}));
		loading = false;
	});

	// unsub from firestore
	onDestroy(unsubscirbe);
</script>

{#if loading}
	<Loader />
{:else}
	<div class="relative flex h-full flex-col-reverse space-y-4 overflow-y-scroll p-4">
		{#each comments as comment}
			<CommentCard {comment} />
		{/each}
	</div>
{/if}
