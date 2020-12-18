import { 
  IFilter,
  IToken,
  IUser,
} from "../interfaces/app";

export enum ActionType {
  SET_USER_INFO = 'SET_USER_INFO',
  SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN',
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  SET_FILTER = 'SET_FILTER',
}

export interface Action {
  type: ActionType;
  payload: any;
}

/** Global State */
export interface State {
  userInfo: IUser;
  accessToken: IToken;
  refreshToken: IToken;
  filter: IFilter;
}

/** Reducer */
const Reducer = (state: State, action: Action): any => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_USER_INFO:
      return {...state, userInfo: payload};

    case ActionType.SET_REFRESH_TOKEN:
      return {...state, accessToken: payload};

    case ActionType.SET_ACCESS_TOKEN:
      return {...state, refreshToken: payload};

    case ActionType.SET_FILTER:
      return {...state, filter: payload};

    default:
      break;
  }
};

export default Reducer;
