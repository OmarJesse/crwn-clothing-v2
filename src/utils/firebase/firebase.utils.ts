import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  DocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/categories.types";
import { Directories } from "../../store/directories/directories.types";

export enum firebaseConfig {
  apiKey = "AIzaSyCyJVIKjwelVNhNp3JFCPIWGmD4HuUZojo",
  authDomain = "crownclothingomar.firebaseapp.com",
  projectId = "crownclothingomar",
  storageBucket = "crownclothingomar.appspot.com",
  messagingSenderId = "1034606444704",
  appId = "1:1034606444704:web:e721652b92fa92b87c49c5",
}

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export type ObjectsToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectsToAdd>(
  collectionkey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionkey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());

    batch.set(docRef, obj);
  });
  return await batch.commit();
};

export const getCollectionsAndDocuments = async (
  collectionKey: string
): Promise<Category[] | Directories> => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type AddnationalInfo = {
  displayName?: string;
};

export type UserData = {
  createdAt?: Date | undefined;
  displayName?: string | undefined;
  email?: string | undefined;
  id: string;
  error?: string | undefined;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  addnationalInfo = {} as AddnationalInfo
): Promise<DocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;
  //create before pushing to db
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addnationalInfo,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return userSnapshot as DocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    throw new Error("Please provide an email and password");
  }

  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredentials;
};

export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    throw new Error("Please provide an email and password");
  }

  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredentials;
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
