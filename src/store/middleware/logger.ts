import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action?.type) {
      return next(action);
    }
    console.log("prev", store.getState());
    console.log("action", action);

    //this runs useSelector in all the components

    next(action);

    //after selecting and modifiying the state is done the next line runs

    console.log("next", store.getState());
  };
