import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducers";
import { categoriesReducer } from "./categories/categories.reducers";
import { directoriesReducer } from "./directories/directories.reducers";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  directories: directoriesReducer,
  cart: cartReducer,
});
