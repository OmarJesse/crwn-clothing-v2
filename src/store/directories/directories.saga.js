import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchDirectoriesFailed,
  fetchDirectoriesSuccess,
} from "./directories.action";
import { all, call, takeLatest, put } from "redux-saga/effects";
import { DIRECTORIES_ACTION_TYPES } from "./directories.types";

export function* fetchDirectoriesAsync() {
  try {
    const directories = yield call(getCollectionsAndDocuments, "directories");
    yield put(fetchDirectoriesSuccess(directories));
  } catch (error) {
    yield put(fetchDirectoriesFailed(error));
  }
}

export function* onFetchDirectories() {
  yield takeLatest(
    DIRECTORIES_ACTION_TYPES.FETCH_DIRECTORIES_START,
    fetchDirectoriesAsync
  );
}

export function* directoriesSaga() {
  yield all([call(onFetchDirectories)]);
}
