import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  FONT,
  Icon_Dot_Menu_White,
  Img_User_Avatar,
} from '../../constants';
import { IBooking } from '../../interfaces/app';

interface props {
  booking: IBooking;
  isCompleted: boolean;
}

const { width: viewportWidth } = Dimensions.get('window');

export const ConfirmedBookingHostInfoView: React.FC<props> = (props: props) => {

  const booking: IBooking = props.booking;
  const isCompleted: boolean = props.isCompleted;

  return (
    <View>
      <View style={styles.line} />
      <View style={styles.host_container}>
        <View style={styles.avatar}>
          <Image style={{width: '100%', height: '100%'}} source={booking.host?.avatarUrl == '' ? Img_User_Avatar : {uri: booking.host?.avatarUrl}} />
        </View>
        
        <Text style={styles.username} numberOfLines={1}>{ booking.host?.fullname }</Text>

        <TouchableWithoutFeedback onPress={() => onMenu()}>
            <View style={styles.dot_menu}>
              <SvgXml width='100%' height='100%' xml={Icon_Dot_Menu_White} />
            </View>
          </TouchableWithoutFeedback>
      </View>
    </View>
  );

  function onMenu() {

  }
}

const styles = StyleSheet.create({
  line: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor50,
  },
  host_container: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    height: 62,
    flexDirection: 'row',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    overflow: 'hidden',
  },
  username: {
    marginTop: 23,
    marginLeft: 12,
    height: 16,
    lineHeight: 16,
    width: viewportWidth - 225,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    flexWrap: 'wrap'
  },
  dot_menu: {
    position: 'absolute',
    right: 24,
    width: 20,
    height: '100%',
    alignItems: 'flex-start',
  },
});
