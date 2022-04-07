<script lang="ts">
	import { db } from '$firebase';
	import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

	export let emoji: string;
	export let emojiName: string;
	export let numberOfReactions: number;
	export let selected: boolean;
	export let id: string;

	// TODO: change to real users id
	const userID = 'abc-123';

	async function add() {
		await updateDoc(doc(db, 'posts', id), {
			[`reactions.${emojiName}`]: selected ? arrayRemove(userID) : arrayUnion(userID)
		});
	}
</script>

<div
	class:selected
	on:click={() => {
		add();
		selected = !selected;
	}}
	class="my-2 flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-100 bg-gray-100 px-2 text-gray-900 transition-colors hover:border-gray-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:border-theme"
>
	{emoji}
	<span class="text-xs">
		{numberOfReactions}
	</span>
</div>

<style>
	.selected {
		@apply border-gray-200 border-theme bg-theme text-gray-100;
	}
</style>
