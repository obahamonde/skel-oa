import { collection, getDocs, getFirestore, orderBy, query, addDoc, deleteDoc, where, onSnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";

interface FirestoreDocument<T> extends DocumentData {
	id: string;
}

function mapDocToData<T>(doc: QueryDocumentSnapshot<DocumentData>): FirestoreDocument<T> {
	const data = doc.data();
	const createdAt = typeof data.createdAt === 'number' ? data.createdAt : Date.now();
	return { ...data, id: doc.id, createdAt } as FirestoreDocument<T>;
}

function useFirestore<T extends { id?: string }>(collectionName: string) {
	const db = getFirestore();
	const col = collection(db, collectionName);
	const [docs, setDocs] = useState<FirestoreDocument<T>[]>([]);

	const get = (user: User) => {
		const q = query(col, orderBy("created_at", "desc"), where("user.id", "==", user.uid));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setDocs(querySnapshot.docs.map(mapDocToData));
		});
		return unsubscribe;
	}

	const set = async (data: T, user: User) => {
		const { uid, displayName, photoURL } = user;
		await addDoc(col, {
			...data,
			user: { id: uid, name: displayName, photoURL }
		});
	}

	const del = async (id: string, user: User) => {
		const q = query(col, orderBy("created_at", "desc"), where("user.id", "==", user.uid));
		const snapshot = await getDocs(q);
		snapshot.forEach(doc => {
			if (doc.id === id) {
				deleteDoc(doc.ref).then(() => {
					return;
				}).catch((error) => {
					console.error("Error removing document: ", error);
				});
			}
		});
	}

	useEffect(() => {
		const unsubscribe = onSnapshot(col, (querySnapshot) => {
			setDocs(querySnapshot.docs.map(mapDocToData));
		});
		return () => unsubscribe();
	}, [col]);

	return [set, get, del, docs] as const;
}

export default useFirestore;
