import * as React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  viewportWidth, 
} from '../../constants';
import { ISpecificExperience } from '../../interfaces/app';
import { ColorButton } from '../Button';
import { useExperiences } from '../../hooks';
import { useGlobalState } from '../../redux/Store';


interface props {
  isCompleted: boolean;
  specificExperience: ISpecificExperience;
}

export const ConfirmedBookingView: React.FC<props> = (props: props) => {

  const userInfo = useGlobalState('userInfo');
  const specificExperience: ISpecificExperience = props.specificExperience;
  const isCompleted: boolean = props.isCompleted;
  
  const { navigate } = useNavigation();
  const { buildBooking } = useExperiences();

  const getUserZoomRole = (itemIds: string[]) => {
    return itemIds.indexOf(userInfo.id) > -1 ? '0': '1'
  }

  const onJoinExperience = async () => {
    const userRole = getUserZoomRole(specificExperience.usersGoing);
    await buildBooking(userInfo.id, specificExperience.id, userRole)
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
      <Image style={styles.image} source={{uri: specificExperience.imageUrl}} />
      { isCompleted == false
        ? <View style={{...styles.content_container, height: 190}}>
            <CustomText style={styles.experience} numberOfLines={1}>{ specificExperience.experience.title }</CustomText>
            <CustomText style={styles.date} numberOfLines={1}>{ `Users Going: ${specificExperience.usersGoing.length}` }</CustomText>
            <CustomText style={styles.date} numberOfLines={1}>{ `${Moment(specificExperience.day).format('MMMM Do YYYY')} • ${specificExperience.startTime}` }</CustomText>
            <View style={styles.join_container}>
              <TouchableWithoutFeedback onPress={ onJoinExperience }>
                <View style={styles.join_button_container}>
                  <ColorButton title={'Join Experience'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        : <View style={{...styles.content_container, height: 190}}>
            <CustomText style={styles.experience} numberOfLines={1}>{ specificExperience.experience.title }</CustomText>
            <CustomText style={styles.date} numberOfLines={1}>{ `Users Going: ${specificExperience.usersGoing.length}` }</CustomText>
            <CustomText style={styles.date} numberOfLines={1}>{ `${Moment(specificExperience.day).format('MMMM Do YYYY')} • ${specificExperience.startTime}` }</CustomText>

            <View style={styles.line} />

            <View style={{...styles.join_container, backgroundColor: COLOR.clearColor}}>
              <CustomText style={styles.end_text} numberOfLines={1}>{ 'Experience has ended' }</CustomText>
            </View>
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
    marginTop: 15,
    marginLeft: 24,
    marginRight: 24,
    height: 18,
    lineHeight: 18,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 18,
    flexWrap: 'wrap', 
    width: viewportWidth - 48,
  },
  date: {
    marginTop: 10,
    height: 16,
    marginLeft: 24,
    lineHeight: 16,
    fontWeight: '500',
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    flexWrap: 'wrap',
    width: viewportWidth - 48,
  },
  end_text: {
    marginTop: 30,
    height: 20,
    marginLeft: 24,
    lineHeight: 20,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    flexWrap: 'wrap',
  },
  line: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor50,
  },
});