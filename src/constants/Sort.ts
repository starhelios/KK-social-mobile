import Moment from 'moment';

// from app
import { IBooking } from '../interfaces/app';


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
