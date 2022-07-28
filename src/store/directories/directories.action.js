import { createAction } from "../../utils/reducer/reducer.utils";
import { DIRECTORIES_ACTION_TYPES } from "./directories.types";

export const setDirectories = (directories) =>
  createAction(DIRECTORIES_ACTION_TYPES.SET_DIRECTORIES, directories);

export const fetchDirectoriesStart = () =>
  createAction(DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_START);

export const fetchDirectoriesSuccess = (directories) =>
  createAction(DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_SUCCESS, directories);

export const fetchDirectoriesFailed = (error) =>
  createAction(DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_FAILED, error);

// export const fetchDirectoriesAsync = () => async (dispatch) => {
//   dispatch(fetchDirectoriesStart());
//   try {
//     const directories = await getCollectionsAndDocuments("directories");
//     dispatch(fetchDirectoriesSuccess(directories));
//   } catch (error) {
//     dispatch(fetchDirectoriesFailed(error));
//   }
// };
