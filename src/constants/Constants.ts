import { AxiosRequestConfig } from "axios";
import { Dimensions, Platform } from "react-native";
import { GoogleSignin } from '@react-native-community/google-signin';
import { LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';

// from app
import { IUser } from "../interfaces/app";

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
}

export var LOGIN_STATE: string;
export const SetLoginState = (state: string) => {
  LOGIN_STATE = state
}