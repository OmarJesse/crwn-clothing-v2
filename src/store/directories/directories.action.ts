import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { DIRECTORIES_ACTION_TYPES, Directories } from "./directories.types";

export type FetchDirectoriesStart = Action<
  typeof DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_START
>;

export type FetchDirectoriesSuccess = ActionWithPayload<
  typeof DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_SUCCESS,
  Directories
>;

export type FetchDirectoriesFailed = ActionWithPayload<
  DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_FAILED,
  Error
>;

export const fetchDirectoriesStart = withMatcher(
  (): FetchDirectoriesStart =>
    createAction(DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_START)
);

export const fetchDirectoriesSuccess = withMatcher(
  (directories: Directories): FetchDirectoriesSuccess =>
    createAction(
      DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_SUCCESS,
      directories
    )
);

export const fetchDirectoriesFailed = withMatcher(
  (error: Error): FetchDirectoriesFailed =>
    createAction(DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_FAILED, error)
);

// export const fetchDirectoriesAsync = () => async (dispatch) => {
//   dispatch(fetchDirectoriesStart());
//   try {
//     const directories = await getCollectionsAndDocuments("directories");
//     dispatch(fetchDirectoriesSuccess(directories));
//   } catch (error) {
//     dispatch(fetchDirectoriesFailed(error));
//   }
// };
