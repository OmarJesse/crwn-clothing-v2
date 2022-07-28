import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyJVIKjwelVNhNp3JFCPIWGmD4HuUZojo",
  authDomain: "crownclothingomar.firebaseapp.com",
  projectId: "crownclothingomar",
  storageBucket: "crownclothingomar.appspot.com",
  messagingSenderId: "1034606444704",
  appId: "1:1034606444704:web:e721652b92fa92b87c49c5",
};

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionkey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionkey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());

    batch.set(docRef, obj);
  });
  return await batch.commit();
};

export const getCollectionsAndDocuments = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

// export const getCollectionsAndDocuments = async (collectionKey) => {
//   const collectionRef = collection(db, collectionKey);
//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);

//   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//     acc[docSnapshot.id] = docSnapshot.data();
//     return acc;
//   }, {});

//   return categoryMap;
// };

export const createUserDocumentFromAuth = async (
  userAuth,
  addnationalInfo = {}
) => {
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
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
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

export const signInAuthWithEmailAndPassword = async (email, password) => {
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

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
