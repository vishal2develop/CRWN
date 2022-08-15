import { createSelector } from "reselect";

// input selector - returns reducer
const selectCategories = (state) => state.categories;

// output selector - memoizes the selector and computes new value only if categoriesSlice
//  (which is the O/P of selectCategoryReducer) changes/updates
// const selectCategories = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => categoriesSlice.categories
// );

// final memoized selector - memoizes the selector and computes new value only if categories
//  (which is the O/P of selectCategories) changes/updates
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log("selector fired");
    return categories.categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
