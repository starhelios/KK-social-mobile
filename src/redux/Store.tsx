import React, { createContext, useReducer, useContext } from 'react';
import Reducer, { State, Action } from './Reducer';

const initialState: State = {
  userInfo: {
    id: '',
    fullname: '',
    isHost: false,
    email: '',
    status: '',
    avatarUrl: '',
    dateOfBirth: '', 
    aboutMe: '',
    location: '',
    categoryName: '',
    createdAt: '',
    stripeCustomerID: '',
    stripeConnectID: '',
    experiences: [],
    ratingsGiven: [],
    availableMethods: [],
    bankInfo: [],
    bookingInfo: [],
  },

  accessToken: {
    token: '',
    expires: '',
  },

  refreshToken: {
    token: '',
    expires: '',
  },

  filter: {
    minPrice: null,
    maxPrice: null,
    startDay: null,
    endDay: null,
    categoryName: [],
    location: '',
  },
  experienceList: [],
  hostList: [],
  categoryList: [],
  selectedCard: {
    id: '',
    cardBrand: '',
    expiryMonth: 0,
    expiryYear: 0,
    last4digits: '',
  },
  needReloadData: false,
};

const StoreContext = createContext<State>(initialState);
const DispatchContext = createContext<React.Dispatch<Action>>(() => true);

/** Provider */
const Provider = (props: any) => {
  
  const { children } = props;

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};

const useDispatch = () => {
  return useContext(DispatchContext);
};

const useGlobalState = <K extends keyof State>(property: K) => {
  const state = useContext(StoreContext);
  return state[property];
};

export { StoreContext, DispatchContext, Provider, useDispatch, useGlobalState };
