import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/categories.saga";
import { directoriesSaga } from "./directories/directories.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(directoriesSaga), call(userSagas)]);
}
