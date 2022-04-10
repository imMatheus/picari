import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import { Post } from '../types/Post';
import faker from 'faker';

// export const createPost = async (post: Post) => {
// 	return await addDoc(collection(db, 'posts'), post);
// };

export const createMockPost = async () => {
	const post = {
		authorId: faker.datatype.uuid(),
		authorName: faker.name.findName(),
		authorImg: faker.image.imageUrl(),
		createdAt: Timestamp.fromDate(new Date()),
		authorLocation: faker.address.city() + ', ' + faker.address.country(),
		imgUrl: faker.image.nightlife(),
		numberOfComments: 0,
		reactions: {
			congratulations: Array.from({ length: Math.ceil(Math.random() * 200) }, () =>
				faker.datatype.uuid()
			),
			heart: Array.from({ length: Math.ceil(Math.random() * 200) }, () => faker.datatype.uuid()),
			laughing: Array.from({ length: Math.ceil(Math.random() * 200) }, () => faker.datatype.uuid()),
			swag: Array.from({ length: Math.ceil(Math.random() * 200) }, () => faker.datatype.uuid()),
			thumbsUp: Array.from({ length: Math.ceil(Math.random() * 200) }, () => faker.datatype.uuid()),
			thumbsDown: Array.from({ length: Math.ceil(Math.random() * 200) }, () =>
				faker.datatype.uuid()
			)
		}
	};
	return await addDoc(collection(db, 'posts'), post);
};
