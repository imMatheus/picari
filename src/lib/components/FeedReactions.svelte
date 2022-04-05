<script lang="ts">
	import FeedReactionsChip from './FeedReactionsChip.svelte';
</script>

<div class="relative flex gap-2 translate-y-1/2">
	<FeedReactionsChip emoji="👍" numberOfReactions={3} />
	<FeedReactionsChip emoji="😂" numberOfReactions={23} />
	<FeedReactionsChip emoji="🅿️" numberOfReactions={3} />
</div>

<style>
</style>
