import { AnyAction } from "redux";
import {
  fetchDirectoriesFailed,
  fetchDirectoriesStart,
  fetchDirectoriesSuccess,
} from "./directories.action";
import { Directories } from "./directories.types";

export type DirectoriesState = {
  readonly directories: Directories;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const DIRECTORIES_INITIAL_STATE: DirectoriesState = {
  directories: [],
  isLoading: false,
  error: null,
};

export const directoriesReducer = (
  state = DIRECTORIES_INITIAL_STATE,
  action: AnyAction
): DirectoriesState => {
  if (fetchDirectoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchDirectoriesSuccess.match(action)) {
    return {
      ...state,
      directories: action.payload,
      isLoading: false,
    };
  }
  if (fetchDirectoriesFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }

  return state;
};
