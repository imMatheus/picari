<script lang="ts">
	import FeedReactions from './FeedReactions.svelte';
	import type { Post } from '../types/Post';
	export let post: Post;

	// const date = new Date(post.createdAt);
</script>

<div class="relative rounded-md bg-gray-100 p-3 pb-0">
	<div class="flex items-start">
		<div class="flex-shrink-0">
			<img class="h-12 w-12 rounded-full object-cover" src={post.authorImg} alt="" />
		</div>
		<div class="ml-3 w-full">
			<div class="flex flex-col items-baseline gap-0.5 md:flex-row md:gap-2">
				<h2 class="text-base font-bold leading-none">{post.authorName}</h2>
				<h4 class="text-xs text-gray-600">{post.authorLocation}</h4>
			</div>
			<div class="mt-1 text-xs font-normal leading-none text-gray-600">{post.createdAt}</div>
		</div>
	</div>
	<img
		class="relative mt-4 max-h-96 rounded-md bg-red-300 object-contain"
		src={post.imgUrl}
		alt=""
	/>
	<FeedReactions />
</div>
