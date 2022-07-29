import { AnyAction } from "redux";

// type Alien = {
//   fly: () => void;
// };

// type Human = {
//   walk: () => void;
// };

// function isHuman(entity: Alien | Human): entity is Human {
//   return (entity as Human).walk !== undefined;
// }

// const Josh = { walk: () => console.log("Walking") };

// if (isHuman(Josh)) {
//   Josh.walk();
// }

type Matchable<AC extends () => AnyAction> = AC & {
  // reach in the action to get the type of the "type"
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;

  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return {
    type,
    payload,
  };
}

// export function createAction<T extends string, P>(
//   type: T,
//   payload?: P
// ): ActionWithPayload<T, P> | Action<T> {
//   return {
//     type,
//     payload,
//   };
// }

// export const createAction = (type, payload) => ({ type, payload });
