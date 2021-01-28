import Moment from 'moment';

export const convertStringToDateFormat = (date: string, format: string) => {
  if (date == '' || date == undefined) {
    return '';
  } else {
    return Moment.utc(new Date(date)).format(format);
  }
}

export const convertStringToDate = (date: string) => {
  if (date == '' || date == undefined) {
    return null;
  } else {
    // return new Date(date);
    // return Moment(date).format("YYYY-MM-DD HH:mm:ss");
    return Moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
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
