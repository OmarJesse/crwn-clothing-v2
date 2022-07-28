import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_REDUCER_TYPES } from "./user.types";

// export const setCurrentUser = (user) =>
//   createAction(USER_REDUCER_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_REDUCER_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_REDUCER_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_REDUCER_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_REDUCER_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_REDUCER_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, addnationalInfo) =>
  createAction(USER_REDUCER_TYPES.SIGN_UP_START, {
    email,
    password,
    addnationalInfo,
  });

export const signUpSuccess = (user, addnationalInfo) =>
  createAction(USER_REDUCER_TYPES.SIGN_UP_SUCESS, { user, addnationalInfo });

export const signUpFailed = (error) =>
  createAction(USER_REDUCER_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createAction(USER_REDUCER_TYPES.SIGN_OUT_START);
export const signOutSuccess = () =>
  createAction(USER_REDUCER_TYPES.SIGN_OUT_SUCCESS);
export const signOutFailed = (error) =>
  createAction(USER_REDUCER_TYPES.SIGN_OUT_FAILED, error);
