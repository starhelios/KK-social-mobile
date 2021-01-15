import { AxiosRequestConfig } from "axios";
import { Dimensions, Platform } from "react-native";
import { GoogleSignin } from '@react-native-community/google-signin';
import { LocaleConfig } from 'react-native-calendars';
import stripe from 'react-native-stripe-payments';
import Moment from 'moment';

// from app
import { IUser } from "../interfaces/app";

//
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_r4mokCjlPlADfBYZwKjzwxSY';
export const STRIPE_SECRET_KEY = 'sk_test_ZXM6wZNvKq7yv7aLRdbyNH9p';

export const GOOGLE_CLIENT_ID = '127467783028-cpm0ooe4mj04algft7b906378f8j12g4.apps.googleusercontent.com';
export const GOOGLE_CLIENT_SECRET = 'yvLHJ9p-WZr3CVh3JRq9nIkf';
export const IOS_GOOGLE_CLIENT_ID = '670577491944-41kkju36r8m33sk0h5974f8o5tqfd7ma.apps.googleusercontent.com';
export const ANDROID_DEBUG_GOOGLE_CLIENT_ID = '670577491944-h3tvr9qj62mgp498sk8letj7uffi0cra.apps.googleusercontent.com';
export const ANDROID_RELEASE_GOOGLE_CLIENT_ID = '670577491944-u32b3gj8g2htpcas4ln89i2b2lu3itkd.apps.googleusercontent.com';


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
  console.log(token);
  API_CONFIG = {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  }
}

export const googleConfigure = () => {
  GoogleSignin.configure({
    iosClientId: IOS_GOOGLE_CLIENT_ID,
    scopes: ['email', 'profile'],
    hostedDomain: '',
    loginHint: '',
    forceCodeForRefreshToken: true,
    accountName: '',
    offlineAccess: true, 
    webClientId: GOOGLE_CLIENT_ID,
  });
}

export const intialization = () => {
  LocaleConfig.locales['en'] = {
    // formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  };
  LocaleConfig.defaultLocale = 'en';
  Moment.locale('en');

  stripe.setOptions({ publishingKey: STRIPE_PUBLISHABLE_KEY });
}

export var LOGIN_STATE: string;
export const SetLoginState = (state: string) => {
  LOGIN_STATE = state
}