<script lang="ts">
	import FeedReactionsChip from './FeedReactionsChip.svelte';
	import { Emojis } from '../../types/Emoji';
	import type { PostReaction } from '../../types/PostReaction';
	export let id: string;
	export let reactions: PostReaction;
</script>

<div class="trangray-y-1/2 relative flex flex-wrap gap-2">
	<!-- {#if reactions} -->
	{#each Object.entries(Emojis) as [reaction, reactionEmoji]}
		<FeedReactionsChip
			emoji={reactionEmoji}
			emojiName={reaction}
			numberOfReactions={reactions ? reactions[reaction]?.length || 0 : 0}
			selected={reactions ? reactions[reaction]?.includes('abc-123') : 0}
			{id}
		/>
	{/each}
</div>
