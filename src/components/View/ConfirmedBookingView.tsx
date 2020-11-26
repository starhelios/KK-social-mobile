import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { IBooking } from 'src/interfaces/app';

// from app
import { COLOR, FONT, Icon_Detail_Right_Arrow } from '../../constants';

interface props {
  booking: IBooking;
}

export const ConfirmedBookingView: React.FC<props> = (props: props) => {

  const booking: IBooking = props.booking;

  return (
    <View style={styles.container}>
      {
        booking.showDate != null && booking.showDate == true
        ? <Text style={styles.date}>{booking.date}</Text>
        : null
      }
      <View style={{...styles.info_container, marginTop: (booking.showDate != null && booking.showDate == true) ? 16 : 22}}>
        <View style={{height: 40}}>
          <Text style={styles.name}>{booking.hour + ' / ' + booking.host?.username}</Text>
          <Text style={styles.experience}>{booking.experience + ' • ' + booking.duration}</Text>
        </View>
        
        <View style={styles.arrow}>
            <SvgXml width='100%' height='100%' xml={Icon_Detail_Right_Arrow} />
        </View>
      </View>

      <View style={styles.info_line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginRight: 24,
  },
  date: {
    marginTop: 33,
    height: 18,
    marginLeft: 1,
    lineHeight: 18,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    color: COLOR.alphaWhiteColor75,
  },
  info_container: {
    marginLeft: 1,
    marginRight: 1,
    marginTop: 22,
    height: 40,
    flexDirection: 'row',
  },
  name: {
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemWhiteColor,
  },
  experience: {
    marginTop: 8,
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.alphaWhiteColor50,
  },
  arrow: {
    position: 'absolute',
    width: 5,
    height: 10,
    right: 0,
    top: 15,
  },
  info_line: {
    marginTop: 22,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor20,
  },
});
