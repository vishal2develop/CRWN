import { createSelector } from "reselect";

// input selector - returns reducer
const selectCategoryReducer = (state) => state.categories;

// output selector - memoizes the selector and computes new value only if categoriesSlice
//  (which is the O/P of selectCategoryReducer) changes/updates
const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// final memoized selector - memoizes the selector and computes new value only if categories
//  (which is the O/P of selectCategories) changes/updates
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
