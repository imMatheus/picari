<script>
	import Discord from '../svg/Discord.svelte';
	import { userStore } from '../../store';
	let userData;
	userStore.subscribe((val) => {
		console.log(val);
		userData = val;
	});
</script>

<div
	class="border-b-gray-500bg-gray-50 flex  items-center justify-between border-b p-4 dark:border-b-gray-600 dark:bg-[#0C111C]"
>
	<div class="sticky top-0 z-50 flex items-baseline gap-2 ">
		<h2 class="text-xl font-bold">Today</h2>
		<p class="text-sm text-gray-500">Cats</p>
	</div>

	{#if userData}
		<!-- render out profile name and avatar image with dropdown for profile settings and log out -->
		<div class="flex items-center gap-2">
			<div class="flex flex-col text-right">
				<p class="text-sm font-bold">{userData.username}</p>
				<button on:click={() => (location.href = './logout')} class="text-xs text-gray-500"
					>Log out</button
				>
			</div>
			<img
				class="h-8 w-8 rounded-full"
				src="https://cdn.discordapp.com/avatars/{userData.discord_id}/{userData.avatar}.png"
				alt="avatar"
			/>
			<!-- chevron down -->
			<svg
				class="h-6 w-6 text-gray-500 dark:text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M19 9l-7 7-7-7"
				/>
			</svg>
		</div>
	{:else}
		<button
			on:click={() => (location.href = './discord/login')}
			class="flex flex-row items-center justify-center gap-1 rounded-md bg-[#7289da] p-2 text-white"
			><Discord color="#fff" height={25} width={25} />Log in with Discord</button
		>
	{/if}
</div>
