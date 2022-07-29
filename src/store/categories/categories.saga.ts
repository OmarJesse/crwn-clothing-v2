import { getCollectionsAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.action";

// import { all, call, takeLatest, put } from "redux-saga/effects";
import { all, call, takeLatest, put } from "typed-redux-saga/macro";

import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCollectionsAndDocuments, "categories");
    yield* put(fetchCategoriesSuccess(categories as Category[]));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
