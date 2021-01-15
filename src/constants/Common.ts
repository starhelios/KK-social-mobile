import Moment from 'moment';
import { Alert, Share } from 'react-native';

// from app
import { IBooking, ICard } from '../interfaces/app';


export const convertStringToDateFormat = (date: string, format: string) => {
  if (date == '' || date == undefined) {
    return '';
  } else {
    return Moment(new Date(date)).format(format);
  }
}

export const convertStringToDate = (date: string) => {
  if (date == '' || date == undefined) {
    return null;
  } else {
    // return new Date(date);
    return Moment(date).format("YYYY-MM-DD HH:mm:ss");
  }
}

export const convertDateToDateFormat = (date: Date, format: string) => {
  if (date == undefined) {
    return '';
  } else {
    // return date.toLocaleString(format);
    return Moment.utc(date).format(format);
  }
}

export const convertDateToMomentDateFormat = (date: Date, format: string) => {
  if (date == undefined) {
    return '';
  } else {
    return Moment.utc(date).format(format);
  }
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

export const SortBookings = (bookings: IBooking[], isAsc: boolean) => {
  return bookings.sort(function(a: IBooking, b: IBooking) {
    let aDay = Moment(a.date + ' ' + a.hour);
    let bDay = Moment(b.date + ' ' + b.hour);

    if (isAsc == true) {
      if (aDay < bDay) {
        return -1;
      } else if (aDay > bDay) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (aDay > bDay) {
        return -1;
      } else if (aDay < bDay) {
        return 1;
      } else {
        return 0;
      }
    }
  });
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
