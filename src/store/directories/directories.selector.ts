import { createSelector } from "reselect";
import { RootState } from "../store";
import { DirectoriesState } from "./directories.reducers";

const selectDirectoriesReducer = (state: RootState): DirectoriesState =>
  state.directories;

export const selectDirectories = createSelector(
  [selectDirectoriesReducer],
  (directories) => directories.directories.sort((a, b) => a.id - b.id)
);

export const selectDirectoriesIsLoading = createSelector(
  [selectDirectoriesReducer],
  (directories) => directories.isLoading
);
