import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_REDUCER_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_REDUCER_TYPES.SET_CURRENT_USER, user);
