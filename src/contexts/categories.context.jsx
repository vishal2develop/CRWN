import React, { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
  setProducts: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    async function getCategories() {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategories();
  }, []);

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
