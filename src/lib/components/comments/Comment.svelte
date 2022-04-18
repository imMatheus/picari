<script lang="ts">
	import type { Comment } from '../../types/Comment';

	export let comment: Comment;
	// TODO: update to real user id
	const userId = 'abc-123';
</script>

<div class:selected={userId === comment.authorId} class="flex max-w-sm gap-1 rounded-lg first:mt-8">
	<div class="h-9 w-9 flex-shrink-0">
		<img src="/static/avatar.jpg" alt="" class="h-full w-full rounded-md object-cover" />
	</div>
	<div class="dark:bg00 rounded-md px-2">
		<h4 class="mb-1.5 text-sm font-bold leading-3">{comment.authorName}</h4>
		<p class="h-max text-sm font-light">
			{comment.text}
		</p>
	</div>
</div>

<style>
	.selected {
		@apply ml-auto flex-row-reverse text-right;
	}
</style>
