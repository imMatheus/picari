import type { PostReaction } from './PostReaction';
import type { Timestamp } from 'firebase/firestore';

export interface Post {
	id: string;
	createdAt: Timestamp;
	authorName: string;
	authorImg: string;
	authorId: string;
	authorLocation: string;
	imgUrl: string;
	numberOfComments: number;
	reactions: PostReaction;
}
