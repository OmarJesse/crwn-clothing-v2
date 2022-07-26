import { compose, createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger";
import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
  thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, composedEnhancers);

export const persistor = persistStore(store);
