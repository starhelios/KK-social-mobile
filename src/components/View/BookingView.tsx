import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// from app
import { 
  COLOR, 
  Img_Experience, 
} from '../../constants';
import { IBooking } from '../../interfaces/app';
import { ColorButton } from '../Button';
import { BookingMainInfoView } from './BookingMainInfoView';
import { BookingRatingInfoView } from './BookingRatingInfoView';

interface props {
  completed_booking: boolean;
  booking: IBooking;
}

const { width: viewportWidth } = Dimensions.get('window');

export const BookingView: React.FC<props> = (props: props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={(props.booking.image == null || props.booking.image == '') ? Img_Experience : {uri: props.booking.image}}
      />
      {
        props.completed_booking == false
        ? ( props.booking.is_joined == true
          ? <View style={{...styles.content_container, height: 98}}>
              <BookingMainInfoView booking={props.booking} completed_booking={props.completed_booking} />
            </View>
          : <View style={{...styles.content_container, height: 190}}>
              <BookingMainInfoView booking={props.booking} completed_booking={props.completed_booking} />

              <View style={styles.join_container}>
                <TouchableWithoutFeedback onPress={() => onJoinExperience()}>
                  <View style={styles.join_button_container}>
                    <ColorButton title={'Join Experience'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
        )
        : <View style={{...styles.content_container, height: 209}}>
            <BookingMainInfoView booking={props.booking} completed_booking={props.completed_booking} />
            <BookingRatingInfoView booking={props.booking} />
          </View>
      }
      
    </View>
  );

  function onJoinExperience() {
  }
}

const styles = StyleSheet.create({
  container: {
    width: viewportWidth - 48,
    height: 438,
    marginBottom: 22,
    flexDirection: 'column',
    borderRadius: 22,
  },
  image: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 22,
  },
  content_container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOR.alphaBlackColor20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  join_container: {
    width: '100%',
    position: 'absolute',
    height: 91,
    bottom: 0,
    backgroundColor: COLOR.whiteColor,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  join_button_container: {
    marginLeft: 24,
    marginTop: 24,
    marginRight: 24,
    height: 44,
  },
});
