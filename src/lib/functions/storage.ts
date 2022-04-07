import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file: File) => {
	const fileExtension = file.name.split('.').pop() as string;
	if (fileExtension !== 'jpg' && fileExtension !== 'jpeg' && fileExtension !== 'png') {
		return new Error('Only jpg, jpeg and png files are allowed');
	}
	const fileName = `${uuidv4()}.${fileExtension}`;

	const imageRef = ref(storage, `images/${fileName}`);
	return await uploadBytes(imageRef, file);
};

export const getImageUrl = async (fileName: string) => {
	const imageRef = ref(storage, `images/${fileName}`);
	return await getDownloadURL(imageRef);
};

export const deleteImage = async (fileName: string) => {
	const imageRef = ref(storage, `images/${fileName}`);
	return await deleteObject(imageRef);
};
