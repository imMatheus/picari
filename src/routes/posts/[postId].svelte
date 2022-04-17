<script lang="ts">
	import { page } from '$app/stores';
	const { postId } = $page.params;
	import CommentsSection from '$components/comments/CommentsSection.svelte';
	import Input from '$components/comments/Input.svelte';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<div
		class="sticky top-0 z-50 flex-none border-b border-b-gray-500 bg-gray-50 p-4 dark:border-b-gray-600 dark:bg-dark"
	>
		<a href="/" class="flex items-center gap-1 text-xl font-bold">
			<ArrowLeftIcon /> Go back
		</a>
		<!-- <p class="text-sm text-gray-500">Cats</p> -->
	</div>
	<CommentsSection {postId} />
	<Input {postId} />
</div>
