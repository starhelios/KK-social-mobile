import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// from app
import { COLOR, CustomText, FONT } from '../../constants';
import { IBooking } from '../../interfaces/app';

interface props {
  booking: IBooking;
  isCompleted: boolean;
}

export const ConfirmedBookingMainInfoView: React.FC<props> = (props: props) => {

  const booking: IBooking = props.booking;
  const isCompleted: boolean = props.isCompleted;

  return (
    <View>
      <CustomText style={styles.experience} numberOfLines={1}>{booking.experience}</CustomText>
      <View style={styles.date_container}>
        <CustomText style={styles.date} numberOfLines={1}>{booking.date + ' • ' + booking.hour}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content_container: {
    width: '100%',
    position: 'absolute',
    height: 98,
    bottom: 0,
    backgroundColor: COLOR.alphaBlackColor20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  experience: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    height: 18,
    lineHeight: 18,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 18,
    flexWrap: 'wrap'
  },
  date_container: {
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
    height: 16,
    flexDirection: 'column',
  },
  date: {
    height: 16,
    lineHeight: 16,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    flexWrap: 'wrap'
  },
  duration: {
    position: 'absolute',
    right: 0,
    height: 16,
    lineHeight: 16,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    flexWrap: 'wrap'
  },
});
