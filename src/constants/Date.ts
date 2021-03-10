import Moment from 'moment';

export const convertStringToDateFormat = (date: string, format: string) => {
  if (date == '' || date == undefined) {
    return '';
  } else {
    return Moment.utc(new Date(date)).format(format);
  }
}

export const convertStringToDate = (date: string) => {
  return new Date(Date.parse(date));
}

export const convertStringToMomentDateFormat = (date: string, format: string) => {
  if (date == '' || date == undefined) {
    return '';
  } else {
    return Moment.utc(date).format(format);
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
