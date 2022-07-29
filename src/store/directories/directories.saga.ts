import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchDirectoriesFailed,
  fetchDirectoriesSuccess,
} from "./directories.action";
import { all, call, takeLatest, put } from "typed-redux-saga/macro";
import { Directories, DIRECTORIES_ACTION_TYPES } from "./directories.types";

export function* fetchDirectoriesAsync() {
  try {
    const directories = yield* call(getCollectionsAndDocuments, "directories");
    yield* put(fetchDirectoriesSuccess(directories as Directories));
  } catch (error) {
    yield* put(fetchDirectoriesFailed(error as Error));
  }
}

export function* onFetchDirectories() {
  yield* takeLatest(
    DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_START,
    fetchDirectoriesAsync
  );
}

export function* directoriesSaga() {
  yield* all([call(onFetchDirectories)]);
}
