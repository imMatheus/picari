<script lang="ts">
	import FeedReactionsChip from './FeedReactionsChip.svelte';
</script>

<div class="relative flex translate-y-1/2 gap-2">
	<FeedReactionsChip emoji="👍" numberOfReactions={3} />
	<FeedReactionsChip emoji="😂" numberOfReactions={23} />
	<FeedReactionsChip emoji="🅿️" numberOfReactions={3} />
</div>

<style>
</style>
