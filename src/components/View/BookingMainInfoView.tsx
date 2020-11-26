import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// from app
import { 
  COLOR, 
  FONT, 
} from '../../constants';
import { IBooking } from '../../interfaces/app';

interface props {
  completed_booking: boolean;
  booking: IBooking;
}

const { width: viewportWidth } = Dimensions.get('window');

export const BookingMainInfoView: React.FC<props> = (props: props) => {
  return (
    <View>
      <Text style={styles.experience}>{props.booking.experience}</Text>
      <View style={styles.date_container}>
        <Text style={styles.date}>{props.booking.date + ' • ' + props.booking.hour}</Text>
        { 
          props.completed_booking == false
          ? <Text style={styles.duration}>{props.booking.duration}</Text>
          : null
        }
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
    marginTop: 24,
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
