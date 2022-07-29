import { createSelector } from "reselect";
import { RootState } from "../store";

import { CategoriesState } from "./categories.reducers";
import { CategoryMap } from "./categories.types";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

const selectCategoriesMemo = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

export const selectCategories = createSelector(
  [selectCategoriesMemo],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);
// add this instead of .length
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => categories.isLoading
);
