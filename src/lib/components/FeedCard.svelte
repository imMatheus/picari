<script lang="ts">
	import FeedReactions from './FeedReactions.svelte';
	export let imgUrl: string;
</script>

<div class="rounded-md bg-gray-100 p-3 pb-5 relative">
	<div class="flex items-start">
		<div class="flex-shrink-0">
			<img
				class="h-12 w-12 rounded-full"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt=""
			/>
		</div>
		<div class="ml-3 w-full">
			<div class="flex items-baseline gap-2">
				<h2 class="text-base font-bold leading-none">Tom Cook</h2>
				<h4 class="text-xs text-gray-600">Stocholm - Sweden</h4>
			</div>
			<div class="mt-1 text-xs font-normal leading-none text-gray-600">14:34:56</div>

			<img class="relative mt-4 h-96 rounded-md bg-red-300 object-cover" src={imgUrl} alt="" />
		</div>
	</div>
	<FeedReactions />
</div>

<style>
</style>
