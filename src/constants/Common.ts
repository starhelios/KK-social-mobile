import { Alert, Share } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import stripe from 'react-native-stripe-payments';
import Moment from 'moment';
import firebase from 'firebase';

// from app
import { 
  convertStringToDateFormat, 
  firebaseConfigure, 
  googleConfigure, 
  STRIPE_PUBLISHABLE_KEY 
} from '.';
import { ICard } from '../interfaces/app';


export const intialization = () => {
  googleConfigure();
  firebaseConfigure();
  stripe.setOptions({ publishingKey: STRIPE_PUBLISHABLE_KEY });

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
    Alert.alert(error.message);
  }
}

export const GetVisibleDateString = (defaultDate: string, selectedFromDate: string, selectedEndDate: string) => {
  var visibleDateString = defaultDate;
  if (selectedFromDate != '') {
    if (selectedFromDate == selectedEndDate) {
      visibleDateString = convertStringToDateFormat(selectedFromDate, 'MMMM D');
    } else {
      visibleDateString = convertStringToDateFormat(selectedFromDate, 'MMM D') + ' ~ ' + convertStringToDateFormat(selectedEndDate, 'MMM D');
    }      
  }
  return visibleDateString;
}

export const GetCardVisibleName = (card: ICard) => {
  if (card.cardType == '' || card.cardNumber == '') {
    return '';
  }

  let cardName = `${card.cardType} `;
  if (card.cardNumber.length <= 4) {
    cardName += card.cardNumber;
  } else {
    const length = card.cardNumber.length;
    cardName += card.cardNumber.substring(length - 4, length);
  }
  return cardName;
}

export const CheckCardExpirationDate = (cardExpiryDate: string) => {
  if (cardExpiryDate.length != 5) {
    return false;
  }

  const expMonth = cardExpiryDate.substring(0, 2);
  const expYear = cardExpiryDate.substring(3, 5);

  const today = new Date();
  const expiryDay = new Date(`20${expYear}-${expMonth}-01`);
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
