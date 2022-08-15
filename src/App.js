import React, { useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { createAction } from "./utils/reducer/reducer.utils";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component.jsx";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import { USER_ACTION_TYPES } from "./store/user/user.types";
import { setCategories } from "./store/categories/categories.actions";
import { getCategoriesAndDocuments } from "./utils/firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // onAuthStateChangedListener returns a function we can unsubscribe
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("user: ", user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
