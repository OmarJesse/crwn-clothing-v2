import { DIRECTORIES_ACTION_TYPES } from "./directories.types";

export const DIRECTORIES_INITIAL_STATE = {
  directories: [],
  isLoading: false,
  error: null,
};

export const directoriesReducer = (
  state = DIRECTORIES_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_START:
      return { ...state, isLoading: true };
    case DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_SUCCESS:
      return {
        ...state,
        directories: payload,
        isLoading: false,
      };
    case DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
