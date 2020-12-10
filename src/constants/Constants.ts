import { AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import { IHost } from "src/interfaces/app";

// Login Type
export const EMAIL_LOGIN = 'Email';
export const GOOGLE_LOGIN = 'Google';
export const FACEBOOK_LOGIN = 'Facebook';
export const APPLE_LOGIN = 'Apple';

// User Defaults Keys
export const LOGIN_TYPE = 'Login_Type';
export const USER_EMAIL = 'Email';
export const PASSWORD = 'Password';
export const ACCESS_TOKEN = 'Access_Token';
export const CODE = 'Code';
export const IS_FIRST_LOGIN = 'Is_First_Login';

// Values
export const MARGIN_TOP = Platform.OS == "ios" ? 15 : 40;
export const LOADING_TIME = 1500;


// Global Values
export var API_CONFIG: AxiosRequestConfig;
export const setApiConfig = (token: string) => {
  API_CONFIG = {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + token,
    },
  }
}

export var HOST: IHost;
export const setHost = (host: IHost) => {
  HOST = host;
}

export const getDurationString = (duration: number) => {
  let hour = Math.floor(duration / 60);
  let min = duration % 60;
  if (hour > 0) {
    if (min > 0) {
      return hour.toString() + 'hr ' + min.toString() + 'min';
    } else {
      return hour.toString() + 'hr';
    }
  } else {
    return min.toString() + 'min';
  }
}
