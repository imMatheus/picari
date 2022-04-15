<script lang="ts">
	import { page } from '$app/stores';
	const { postId } = $page.params;
	import CommentsSection from '$components/comments/CommentsSection.svelte';
	import Input from '$components/comments/Input.svelte';
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<div
		class="sticky top-0 z-50 flex flex-none items-baseline gap-2 border-b border-b-gray-500 bg-gray-50 p-4 dark:border-b-gray-600 dark:bg-dark"
	>
		<h2 class="text-xl font-bold">{postId}</h2>
		<p class="text-sm text-gray-500">Cats</p>
	</div>
	<CommentsSection {postId} />
	<Input {postId} />
</div>
