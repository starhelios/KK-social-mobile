import { Platform } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import { GoogleSignin } from '@react-native-community/google-signin';
import Moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';

// from app
import { IFile } from '../interfaces/app';

export const googleConfigure = () => {
  GoogleSignin.configure({
    iosClientId: '670577491944-41kkju36r8m33sk0h5974f8o5tqfd7ma.apps.googleusercontent.com',
    scopes: ['email', 'profile'],
    hostedDomain: '',
    loginHint: '',
    forceCodeForRefreshToken: true,
    accountName: '', 
    webClientId: '',
  });
}

export const intialization = () => {
  LocaleConfig.defaultLocale = 'en';
  Moment.locale('en');
}

export const convertStringToDateFormat = (date: string, format: string) => {
  if (date == '' || date == undefined) {
    return '';
  } else {
    return Moment.utc(new Date(date)).format(format);
  }
}

export const convertDateToDateFormat = (date: Date, format: string) => {
  if (date == undefined) {
    return '';
  } else {
    return Moment(date).format(format);
  }
}

export const generateName = () => {
  return (
    Math.random().toString(36).substring(2, 10) +
    '-' +
    Math.random().toString(36).substring(2, 6)
  );
}

export const choosePhoto = async (cropping: boolean): Promise<any> => {
  ImagePicker.openPicker({
    includeBase64: true,
    multiple: false,
    cropping: cropping,
    mediaType: "photo",
  })
  .then((image) => {
    const file = {
      name: 'image.jpg',
      type: image.mime,
      uri:
        Platform.OS === 'android'
          ? image.path
          : image.path.replace('file://', ''),
    };
    return Promise.resolve(file);
  })
  .catch((e) => {
    return Promise.reject(null);
  });
}

export const takePicture = async (cropping: boolean): Promise<any> => {
  ImagePicker.openCamera({
    includeBase64: true,
    multiple: false,
    cropping: cropping,
    mediaType: "photo",
  })
  .then((image) => {
    const file: IFile = {
      name: 'image.jpg',
      type: image.mime,
      uri:
        Platform.OS === 'android'
          ? image.path
          : image.path.replace('file://', ''),
    };
    return Promise.resolve(file);
  })
  .catch((e) => {
    return Promise.reject(null);
  });
}