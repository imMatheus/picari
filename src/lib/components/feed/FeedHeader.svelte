<script>
	import Discord from '../svg/Discord.svelte';
</script>

<div
	class="border-b-gray-500bg-gray-50 flex  items-center justify-between border-b p-4 dark:border-b-gray-600 dark:bg-[#0C111C]"
>
	<div class="sticky top-0 z-50 flex items-baseline gap-2 ">
		<h2 class="text-xl font-bold">Today</h2>
		<p class="text-sm text-gray-500">Cats</p>
	</div>
	<button
		on:click={() => (location.href = './discord/login')}
		class="flex flex-row items-center justify-center gap-1 rounded-md bg-[#7289da] p-2 text-white"
		><Discord color="#fff" height={25} width={25} />Log in with Discord</button
	>
</div>
