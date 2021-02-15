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
    offlineAccess: true, 
    webClientId: '670577491944-sf4h58m22gt1716gjl916j51uces495t.apps.googleusercontent.com',
  });
}

export const firebaseConfigure = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyDP4qDjxwMCAyuwY-6ZvKP3lf58qBxBydM",
    authDomain: "klout-kast-development.firebaseapp.com",
    projectId: "klout-kast-development",
    storageBucket: "klout-kast-development.appspot.com",
    messagingSenderId: "943789863268",
    appId: "1:943789863268:web:9961ac852f48b55a8d8a71",
    measurementId: "G-CJCMH0YB2M",
  };
  
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
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

export const GOOGLE_MAP_KEY = 'AIzaSyAcHUaRR1URQlQR54ebNGeByyDR7Y6pJn4';
export const ZOOM_INTEGRATION_URL = 'https://zoom.us/oauth/authorize?response_type=code&client_id=cZBMH5Q_T3OP5C2Ih0Bzcw&redirect_uri=https://kloutkast.herokuapp.com/profile/zoom-confirmation';
export const ZOOM_INTEGRATION_REDIRECT_URL = 'https://kloutkast.herokuapp.com/profile/zoom-confirmation';

// Global Values
export let API_CONFIG: AxiosRequestConfig;
export const SetApiConfig = (token: string) => {
  console.log('access_token: ' + token);
  API_CONFIG = {
    headers: token != '' ? {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    } : {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }
}

export let LOGIN_STATE: string;
export const SetLoginState = (state: string) => {
  LOGIN_STATE = state
}