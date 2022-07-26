import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

const selectCategoriesMemo = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

export const selectCategories = createSelector(
  [selectCategoriesMemo],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
// add this instead of .length
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
