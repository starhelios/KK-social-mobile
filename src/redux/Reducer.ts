import { 
  IFilter, 
  IRegisterUser, 
  ICategory, 
  ILoginUser,
} from "../interfaces/app";

export enum ActionType {
  SET_USER_INFO = 'SET_USER_INFO',
  SET_REGISTER_USER = 'SET_REGISTER_USER',
  SET_CATEGORY_LIST = 'SET_CATEGORY_LIST',
  SET_FILTER = 'SET_FILTER',
}

export interface Action {
  type: ActionType;
  payload: any;
}

/** Global State */
export interface State {
  userInfo: ILoginUser;
  registerUser: IRegisterUser;
  categoryList: ICategory[];
  filter: IFilter;
}

/** Reducer */
const Reducer = (state: State, action: Action): any => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_USER_INFO:
      return {...state, userInfo: payload};

    case ActionType.SET_REGISTER_USER:
      return {...state, registerUser: payload};

    case ActionType.SET_CATEGORY_LIST:
      return {...state, categoryList: payload};

    case ActionType.SET_FILTER:
      return {...state, filter: payload};

    default:
      break;
  }
};

export default Reducer;
