<script lang="ts">
	export let emoji: string;
	export let numberOfReactions: number;
</script>

<div
	class="flex cursor-pointer items-center gap-1 rounded-full border-2 border-gray-900 bg-gray-900 py-0 px-2 text-gray-200 hover:border-theme"
>
	{emoji}
	<span class="text-xs">
		{numberOfReactions}
	</span>
</div>

<style>
</style>
