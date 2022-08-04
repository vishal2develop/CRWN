import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  // passsing value and setter method
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //   signOutUser();

  useEffect(() => {
    // onAuthStateChangedListener returns a function we can unsubscribe
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("user: ", user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
