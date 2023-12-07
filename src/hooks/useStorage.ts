import {
	getDownloadURL,
	getStorage,
	uploadBytesResumable,
	deleteObject,
	ref as firebaseRef,
} from "firebase/storage";

export const useFirebaseStorage = () => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<any>(null);
	const [url, setUrl] = useState<string | null>(null);

	const storage = getStorage();

	const uploadFile = async (file: File, path: string) => {
		const storageRef = firebaseRef(storage, path);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progress);
			},
			(error) => {
				setError(error);
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				setUrl(downloadURL);
			}
		);
	};

	const deleteFile = async (path: string) => {
		const storageRef = firebaseRef(storage, path);
		await deleteObject(storageRef);
	};

	return { progress, url, error, uploadFile, deleteFile };
}	