import { Alert, Platform, Share } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';
import firebase from 'firebase';

// from app
import { 
  convertStringToDateFormat, 
  firebaseConfigure, 
  googleConfigure, 
} from '.';


export const intialization = () => {
  googleConfigure();
  firebaseConfigure();

  Moment.locale('en');

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
}

export const generateName = () => {
  return (
    Math.random().toString(36).substring(2, 10) +
    '-' +
    Math.random().toString(36).substring(2, 6)
  );
}

export const GetDurationString = (duration: number) => {
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

export const ShowShareView = async (title: string, url: string) => {
  try {
    const result = await Share.share({
      title: title,
      url: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    Alert.alert('', error.message);
  }
}

export const GetVisibleDateString = (defaultDate: string, selectedFromDate: string, selectedEndDate: string) => {
  let visibleDateString = defaultDate;
  if (selectedFromDate != '') {
    if (selectedFromDate == selectedEndDate) {
      visibleDateString = convertStringToDateFormat(selectedFromDate, 'MMMM D');
    } else {
      visibleDateString = convertStringToDateFormat(selectedFromDate, 'MMM D') + ' ~ ' + convertStringToDateFormat(selectedEndDate, 'MMM D');
    }      
  }
  return visibleDateString;
}

export const CheckCardExpirationDate = (expYear: number, expMonth: number) => {
  if (expYear == 0 || expMonth == 0) {
    return false;
  }

  const today = new Date();
  const expiryDay = new Date(`${expYear}-${expMonth}-01`);
  
  if (expiryDay < today) {
    return false;
  } else {
    return true;
  }
}

export const UploadImageToFirebase = async (filename: string, uploadUri: string): Promise<any> => {
    const response = await fetch(uploadUri);
    const blob = await response.blob();
    const uploadTask = firebase.storage().ref(`images/${filename}.jpg`).put(blob);
    // uploadTask.on('state_changed', snapshot => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
    //   );
    // });
    try {
      await uploadTask;
      firebase.storage()
        .ref('images')
        .child(`${filename}.jpg`)
        .getDownloadURL()
        .then((url) => {
          return Promise.resolve(url);
        });
    } catch (e) {
      return Promise.reject(e);
    }
}

export const GetCardExpirationMonth = (cardExpirationDate: string) => {
  if (cardExpirationDate.length < 2) {
    return 0;
  }
  return parseInt(cardExpirationDate.substring(0, 2));
}

export const GetCardExpirationYear = (cardExpirationDate: string) => {
  if (cardExpirationDate.length < 5) {
    return 0;
  }
  return parseInt(cardExpirationDate.substring(3, 5));
}

export const GetCardNumber = (number: string) => {
  const strCardNumber = number.split(' ').join('');
  if (strCardNumber.length != 16) {
    return '';
  }
  const cardNumber = `${strCardNumber.substring(0, 4)} ${strCardNumber.substring(4, 8)} ${strCardNumber.substring(8, 12)} ${strCardNumber.substring(12, 16)}`;
  return cardNumber;
}
