import { createSelector } from "reselect";

const selectDirectoriesReducer = (state) => state.directories;

export const selectDirectories = createSelector(
  [selectDirectoriesReducer],
  (directories) => directories.directories.sort((a, b) => a.id - b.id)
);

export const selectDirectoriesIsLoading = createSelector(
  [selectDirectoriesReducer],
  (directories) => directories.isLoading
);
