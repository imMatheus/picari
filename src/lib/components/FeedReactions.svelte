<script lang="ts">
	import FeedReactionsChip from './FeedReactionsChip.svelte';
	import { Emoji, Emojis } from '../types/Emoji';
	import type { PostReaction } from '../types/PostReaction';
	export let id: string;
	export let reactions: PostReaction;
	console.log('id: ' + id);

	console.log(reactions);
	console.log(reactions && Object.entries(reactions));
	console.log(Emojis && Object.entries(Emojis));
</script>

<div class="trangray-y-1/2 relative flex flex-wrap gap-2">
	<!-- {#if reactions} -->
	{#each Object.entries(Emojis) as [reaction, reactionEmoji]}
		<FeedReactionsChip
			emoji={reactionEmoji}
			emojiName={reaction}
			numberOfReactions={0}
			selected={false}
			{id}
		/>
	{/each}
</div>
