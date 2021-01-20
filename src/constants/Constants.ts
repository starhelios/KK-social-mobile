import { AxiosRequestConfig } from "axios";
import { Dimensions, Platform } from "react-native";
import { GoogleSignin } from '@react-native-community/google-signin';
import firebase from 'firebase';


export const STRIPE_PUBLISHABLE_KEY = 'pk_test_r4mokCjlPlADfBYZwKjzwxSY';
export const STRIPE_SECRET_KEY = 'sk_test_ZXM6wZNvKq7yv7aLRdbyNH9p';

export const googleConfigure = () => {
  GoogleSignin.configure({
    iosClientId: '670577491944-41kkju36r8m33sk0h5974f8o5tqfd7ma.apps.googleusercontent.com',
    scopes: ['email', 'profile'],
    hostedDomain: '',
    loginHint: '',
    forceCodeForRefreshToken: true,
    accountName: '',
    offlineAccess: false, 
    webClientId: '670577491944-sf4h58m22gt1716gjl916j51uces495t.apps.googleusercontent.com',
  });
}

export const firebaseConfigure = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCA4O_4tL5cYKcJ0TiAGI2jQn-8xK5153s',
    authDomain: 'kloutkast-63bdc.firebaseapp.com',
    databaseURL: 'https://kloutkast-63bdc.firebaseio.com',
    projectId: 'kloutkast-63bdc',
    storageBucket: 'kloutkast-63bdc.appspot.com',
    messagingSenderId: '836615527905',
    appId: '1:836615527905:web:fd8acfc4789e0fdbdd86a0',
    measurementId: 'G-ST4DFKQG9Q',
  };
  
  firebase.initializeApp(firebaseConfig);
}

// Login Type
export const EMAIL_LOGIN = 'Email';
export const GOOGLE_LOGIN = 'Google';
export const FACEBOOK_LOGIN = 'Facebook';
export const APPLE_LOGIN = 'Apple';

// User Defaults Keys
export const LOGIN_TYPE = 'Login_Type';
export const USER_EMAIL = 'Email';
export const PASSWORD = 'Password';
export const IS_FIRST_LOGIN = 'Is_First_Login';

export const DAY_OF_WEEK = Object.freeze({
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
});

// Values
export const MARGIN_TOP = Platform.OS == "ios" ? 15 : 40;
export const LOADING_TIME = 1500;

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// Global Values
export var API_CONFIG: AxiosRequestConfig;
export const SetApiConfig = (token: string) => {
  console.log('access_token: ' + token);
  API_CONFIG = {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  }
}

export var LOGIN_STATE: string;
export const SetLoginState = (state: string) => {
  LOGIN_STATE = state
}