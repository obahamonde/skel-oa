import { initializeApp } from "firebase/app";
import config from "~/hooks/config";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
	User,
} from "firebase/auth";

export const useAuth = () => {
	const firebaseApp = initializeApp(config);
	const auth = getAuth(firebaseApp);
	const provider = new GoogleAuthProvider();
	const [user, setUser] = useState<User | null>(null);
	const logIn = async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (err: any) {
			console.log(err);
		}
	};

	const logOut = async () => {
		try {
			await signOut(auth);
		} catch (err: any) {
			console.log(err);
		}
	};

	onAuthStateChanged(auth, (u) => {
		if (u) {
			setUser(u);
		} else {
			setUser(null);
		}
	});

	return {
		logIn,
		logOut,
		user,
	};
};