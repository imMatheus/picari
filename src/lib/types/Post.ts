import type { PostReaction } from './PostReaction';
import type { Timestamp } from 'firebase/firestore';

export interface Post {
	id: string;
	createdAt: Date | Timestamp;
	authorName: string;
	authorImg: string;
	authorId: string;
	authorLocation: string;
	imgUrl: string;
	reactions: PostReaction[];
}
