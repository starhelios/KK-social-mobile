import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Stars from 'react-native-stars';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT,
  Img_Rating_Empty,
  Img_Rating_Full, 
} from '../../constants';
import { IUserBooking } from '../../interfaces/app';

interface props {
  booking: IUserBooking;
}

export const BookingRatingInfoView: React.FC<props> = (props: props) => {

  const booking: IUserBooking = props.booking;

  return (
    <View>
      <View style={styles.line} />
      {/* <CustomText style={styles.rating_title}>
        {
          booking.is_host == true 
          ? (booking.host != null ? 'Rate your host, ' + booking.host.fullname : 'Rate your host')
          : 'Rate this experience:'}
      </CustomText> */}
      <View style={styles.rating}>
        <Stars
          value={5}
          spacing={12}
          count={5}
          starSize={29}
          fullStar={Img_Rating_Full}
          emptyStar={Img_Rating_Empty}
          half={false}
        />
      </View>
    </View>
  );
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
  rating_title: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    height: 16,
    lineHeight: 16,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    flexWrap: 'wrap'
  },
  rating: {
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
    height: 29,
    alignItems: 'flex-start',
  },
});
