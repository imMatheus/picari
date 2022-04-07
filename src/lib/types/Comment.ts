import type { Timestamp } from 'firebase/firestore';

export interface Comment {
	authorName: string;
	authorImg: string;
	authorId: string;
	text: string;
	createdAt: Timestamp;
}
