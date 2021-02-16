import { 
  ICategory,
  IExperience,
  IFilter,
  IUser,
  IToken,
  ICardInfo,
  IUserBooking,
} from "../interfaces/app";

export enum ActionType {
  SET_USER_INFO = 'SET_USER_INFO',
  SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN',
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  SET_FILTER = 'SET_FILTER',
  SET_EXPERIENCE_LIST = 'SET_EXPERIENCE_LIST',
  SET_HOST_LIST = 'SET_HOST_LIST',
  SET_CATEGORY_LIST = 'SET_CATEGORY_LIST',
  SET_RESERVED_BOOKING_LIST = 'SET_RESERVED_BOOKING_LIST',
  SET_SELECT_CARD = 'SET_SELECT_CARD',
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
  experienceList: IExperience[];
  hostList: IUser[];
  categoryList: ICategory[];
  reservedBookingList: IUserBooking[],
  selectedCard: ICardInfo,
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

    case ActionType.SET_EXPERIENCE_LIST:
      return {...state, experienceList: payload};

    case ActionType.SET_HOST_LIST:
      return {...state, hostList: payload};

    case ActionType.SET_CATEGORY_LIST:
      return {...state, categoryList: payload};

    case ActionType.SET_RESERVED_BOOKING_LIST:
      return {...state, reservedBookingList: payload};

    case ActionType.SET_SELECT_CARD:
      return {...state, selectedCard: payload};

    default:
      break;
  }
};

export default Reducer;
