import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1MoQMZPZ29RCT8NGCBrm5evhRFvR4xX4",
  authDomain: "crwn-clothing-db-3059f.firebaseapp.com",
  projectId: "crwn-clothing-db-3059f",
  storageBucket: "crwn-clothing-db-3059f.appspot.com",
  messagingSenderId: "447110133562",
  appId: "1:447110133562:web:4b3e245bac2b6a62b50203",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // Step 1:  getting collection reference
  const userDocRef = doc(db, "users", userAuth.uid);

  //   Step 2: Check if document exists
  const userSnapshot = await getDoc(userDocRef);

  //   if user data exists -> return data
  // if user data doesn't exists -> create/set document with data from userAuth in collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //   Step 3: set the document

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user: ", error);
    }
  }

  return userDocRef;
};