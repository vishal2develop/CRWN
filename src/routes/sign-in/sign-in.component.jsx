import React, { useState } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const Signin = () => {
  

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Signin</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>

      <SignUpForm />
    </div>
  );
};

export default Signin;
