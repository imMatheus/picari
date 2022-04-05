import type { PostReaction } from './PostReaction';

export interface Post {
	id: string;
	createdAt: Date;
	authorName: string;
	authorImg: string;
	authorId: string;
	authorLocation: string;
	imgUrl: string;
	reactions: PostReaction[];
}
