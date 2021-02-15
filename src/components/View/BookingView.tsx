import * as React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  GetDurationString, 
  Img_Experience,
  viewportWidth, 
} from '../../constants';
import { IUserBooking } from '../../interfaces/app';
import { ColorButton } from '../Button';
import { BookingMainInfoView, BookingRatingInfoView } from '.';
import { useExperiences, useUsers } from '../../hooks';
import { useGlobalState } from '../../redux/Store';

interface props {
  completed_booking: boolean;
  booking: IUserBooking;
}

export const BookingView: React.FC<props> = (props: props) => {

  const userInfo = useGlobalState('userInfo');
  const booking: IUserBooking = props.booking;
  const completed_booking: boolean = props.completed_booking;
  
  const { navigate } = useNavigation();
  const { buildBooking } = useExperiences();

  const getUserZoomRole = (itemIds: string[]) => {
    return itemIds.indexOf(userInfo.id) > -1 ? '0': '1'
  }

  const onJoinExperience = async () => {
    const userRole = getUserZoomRole(booking.usersGoing);
    await buildBooking(userInfo.id, booking.id, userRole)
    .then(async (result: Promise<string>) => {
      const base64Url = await result;
      // const base64Url = Buffer.from(await result, 'utf-8').toString('base64');
      const buildUrl = `https://kloutkast-zoom.herokuapp.com/${base64Url}`;
      navigate('JoinBooking', {zoomUrl: buildUrl});
    })
    .catch(async (error: Promise<string>) => {
      Alert.alert('', await error);
    })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: booking.imageUrl}} />
      { completed_booking == false
        ? <View style={{...styles.content_container, height: 190}}>
            <CustomText style={styles.experience}>{booking.experience.title}</CustomText>
            <View style={styles.date_container}>
              <CustomText style={styles.date}>{booking.day + ' • ' + booking.startTime}</CustomText>
              <CustomText style={styles.duration}>{GetDurationString(booking.experience.duration)}</CustomText>
            </View>

            <View style={styles.join_container}>
              <TouchableWithoutFeedback onPress={onJoinExperience}>
                <View style={styles.join_button_container}>
                  <ColorButton title={'Join Experience'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        : <View style={{...styles.content_container, height: 209}}>
            <CustomText style={styles.experience}>{booking.experience.title}</CustomText>
            <View style={styles.date_container}>
              <CustomText style={styles.date}>{booking.day + ' • ' + booking.startTime}</CustomText>
            </View>
            <BookingRatingInfoView booking={booking} />
          </View>
      }
    </View>
  );
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
  experience: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    height: 18,
    lineHeight: 18,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
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
    fontSize: 14,
    flexWrap: 'wrap'
  },
});
