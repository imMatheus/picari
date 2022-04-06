<script lang="ts">
	import FeedReactions from './FeedReactions.svelte';
	import type { Post } from '../types/Post';
	import { Timestamp } from 'firebase/firestore';
	export let post: Post;
	import { MapPinIcon } from 'svelte-feather-icons';

	const date = post.createdAt.toDate().toLocaleTimeString();
</script>

<div class="relative border-b border-b-gray-500 p-3 last:border-b-0 dark:border-b-gray-600">
	<div class="flex items-start">
		<div class="flex-shrink-0">
			<img class="h-12 w-12 rounded-full object-cover" src={post.authorImg} alt="" />
		</div>
		<div class="ml-3 w-full">
			<div class="flex flex-col items-baseline gap-0.5 md:flex-row md:gap-2">
				<h2 class="text-base font-bold leading-none">{post.authorName}</h2>
				<h4 class="text-sm text-gray-500 dark:text-gray-600">{date}</h4>
			</div>
			<div
				class="mt-2.5 flex items-center gap-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-400"
			>
				<MapPinIcon class="h-3.5 w-3.5" />
				{post.authorLocation}
			</div>
		</div>
	</div>
	<img class="relative mt-4 max-h-[28rem] rounded-md object-contain" src={post.imgUrl} alt="" />
	<FeedReactions id={post.id} reactions={post.reactions} />
</div>
