import { 
  IUser,
} from "../interfaces/app";

export enum ActionType {
  SET_USER_INFO = 'SET_USER_INFO',
}

export interface Action {
  type: ActionType;
  payload: any;
}

/** Global State */
export interface State {
  userInfo: IUser;
}

/** Reducer */
const Reducer = (state: State, action: Action): any => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_USER_INFO:
      return {...state, userInfo: payload};

    default:
      break;
  }
};

export default Reducer;
