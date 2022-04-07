<script lang="ts">
	import { db } from '$firebase';
	import { addDoc, collection, updateDoc, doc, increment } from 'firebase/firestore';
	import type { Comment } from '../../types/Comment';
	import { Timestamp } from 'firebase/firestore';
	export let postId: string;

	let comentString = '';

	async function createComment() {
		if (!comentString) return;
		const comment: Comment = {
			authorId: 'abc-123',
			authorName: 'John Doe',
			authorImg: 'http://placekitten.com/200/300',
			text: comentString,
			createdAt: Timestamp.now()
		};

		// adds new comment to a post
		await addDoc(collection(db, `posts/${postId}/comments`), comment);
		// update field for the post
		await updateDoc(doc(db, `posts/${postId}`), {
			numberOfComments: increment(1)
		});

		comentString = '';
	}
</script>

<form class="flex flex-shrink-0 border bg-white p-4" on:submit|preventDefault={createComment}>
	<input
		bind:value={comentString}
		type="text"
		name="comment"
		id="comment"
		placeholder="Add a comment..."
		class="block w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
	/>

	<button type="submit" class="ml-2 rounded-md bg-theme py-1 px-4 text-white">Send</button>
</form>
