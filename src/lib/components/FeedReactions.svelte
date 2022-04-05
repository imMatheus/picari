<script lang="ts">
	import FeedReactionsChip from './FeedReactionsChip.svelte';
</script>

<div class="absolute flex gap-2 -bottom-0 translate-y-1/2 -left-1">
	<FeedReactionsChip emoji="👍" numberOfReactions={3} />
	<FeedReactionsChip emoji="😂" numberOfReactions={23} />
	<FeedReactionsChip emoji="🅿️" numberOfReactions={3} />
</div>

<style>
</style>
