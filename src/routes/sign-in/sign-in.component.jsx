import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGooglRedirect,
} from "../../utils/firebase/firebase.utils";
const Signin = () => {
  useEffect(() => {
    async function signInWithRedirect() {
      const response = await getRedirectResult(auth);
      console.log("response: ", response);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    signInWithRedirect();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const logGoogleUserRedirect = async () => {
    const { user } = await signInWithGooglRedirect();
    console.log(user);
    // const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Signin</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <br />
      <br />
      <button onClick={signInWithGooglRedirect}>
        Sign in with google redirect
      </button>
    </div>
  );
};

export default Signin;
