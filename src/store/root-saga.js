import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/categories.saga";
import { directoriesSaga } from "./directories/directories.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(categoriesSaga), call(directoriesSaga), call(userSagas)]);
}
