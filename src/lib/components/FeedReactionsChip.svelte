<script lang="ts">
	export let emoji: string;
	export let numberOfReactions: number;
</script>

<div
	class="bg-gray-900 cursor-pointer text-gray-200 py-0 px-2 flex items-center gap-1 rounded-full border-2 border-gray-900 hover:border-theme"
>
	{emoji}
	<span class="text-xs">
		{numberOfReactions}
	</span>
</div>

<style>
</style>
