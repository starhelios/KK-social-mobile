import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  convertStringToDateFormat, 
  CustomText, 
  FONT, 
  Icon_Back_Black,
  Icon_Experience_Rating,
  Img_Experience,
  MARGIN_TOP,
  viewportWidth,
} from '../../constants';
import { ColorButton, TitleArrowButton } from '../../components/Button';
import { IAvailableDate, IExperience, IHostDetail, IUser } from '../../interfaces/app';


export const ExperienceDetailConfirmPayScreen: React.FC = ({route}) => {

  const { goBack, navigate } = useNavigation();

  const experience: IExperience = route.params.experience;
  const availableDate: IAvailableDate = route.params.availableDate;
  const guestCount: number = route.params.guestCount;
  const hostDetail: IHostDetail = route.params.hostDetail;
  const host: IUser = hostDetail.user;

  useEffect(() => {
  }, []);

  return (
    <Container style={{...styles.background, backgroundColor: COLOR.whiteColor}}>

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>{ 'Confirm & Pay' }</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView style={styles.container} bounces={false}>
          <View style={image_styles.container}>
            <Image
              style={image_styles.image}
              source={experience.images.length > 0 ? {uri: experience.images[0]} : Img_Experience} />

            <View style={{...image_styles.content_container, width: viewportWidth - 89}}>
              <CustomText style={image_styles.title} numberOfLines={2}>{experience.title}</CustomText>

              <View style={image_styles.rating_container}>
                <SvgXml width={15} height={15} xml={Icon_Experience_Rating} />
                <CustomText style={image_styles.rating_text} numberOfLines={1}>{hostDetail.ratingMark}</CustomText>
                <CustomText style={{...image_styles.rating_text, color: COLOR.alphaBlackColor50}} numberOfLines={1}>
                  {'(' + hostDetail.ratingCount.toString() + ')'}</CustomText>
              </View>
            </View>
          </View>

          <CustomText style={styles.info_title}>Details</CustomText>

          <CustomText style={styles.info_detail_title}>Date</CustomText>
          <CustomText style={styles.info_detail_content}>{convertStringToDateFormat(availableDate.day, 'ddd, MMM DD') + '  ' + availableDate.startTime + ' - ' + availableDate.endTime + '(EDT)'}</CustomText>
          <View style={styles.line} />

          <CustomText style={styles.info_detail_title}>Guest</CustomText>
          <CustomText style={styles.info_detail_content}>{guestCount.toString() + ' person'}</CustomText>
          <View style={styles.line} />

          <CustomText style={styles.info_detail_title}>Price Detail</CustomText>
          <View style={{flexDirection: 'row'}}>
            <CustomText style={styles.info_detail_content}>{'$' + experience.price + ' x ' + guestCount.toString() + ' person'}</CustomText>
            <CustomText style={styles.price_unit}>{'$' + Math.floor(experience.price * guestCount).toString()}</CustomText>
          </View>
          <View style={styles.line} />

          <CustomText style={styles.info_title}>Payment</CustomText>
          <View style={{marginLeft: 24, width: viewportWidth - 48, marginTop: 16}}>
            <TitleArrowButton title={'Credit Card'} name={''} showArrow={true} white_color={false} />
          </View>
        </ScrollView>

        <TouchableWithoutFeedback onPress={() => onConfirmPay() }>
          <View style={styles.bottom_button}>
            <ColorButton title={'Confirm & Pay'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
          </View>
        </TouchableWithoutFeedback>
        
      </SafeAreaView>
    </Container>
  );

  function onConfirmPay() {

  }
};

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    flex: 1, 
    backgroundColor: COLOR.blackColor, 
    alignItems: 'center',
  },
  safe_area: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  navigation_bar: {
    marginTop: MARGIN_TOP,
    width: '100%',
    height: 33,
    flexDirection: 'row',
  },
  title: {
    width: '100%',
    height: 33, 
    lineHeight: 33,
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
    textAlign: 'center',
    fontWeight: '600',
    color: COLOR.systemBlackColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  share_icon: {
    position: 'absolute',
    right: 24,
    width: 20,
    height: '100%',
  },
  description_text: {
    marginTop: 33,
    marginLeft: 24,
    marginRight: 24,
    height: 23,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.systemWhiteColor,
  },
  container: {
    width: '100%',  
    marginBottom: 85,
  },
  profile_container: {
    width: '100%',
    height: 150,
    marginTop: 42,
    alignItems: 'center',
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  profile_no_image: {
    width: '100%', 
    height: '100%',
    borderRadius: 75,
    backgroundColor: COLOR.whiteColor, 
    alignItems: 'center', 
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  camera_container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 45,
    alignItems: 'center', 
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  camera_icon: {
    position: 'absolute',
    bottom: 15,
    width: 30,
    height: 25,
  },
  bottom_container: {
    position: 'absolute',
    width: '100%',
    height: 134,
    flex: 1,
    bottom: 0,
    flexDirection: 'row',
  },
  bottom_button: {
    position: 'absolute',
    bottom: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
  info_title: {
    marginTop: 44,
    marginLeft: 24,
    height: 24,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemBlackColor,
  },
  info_detail_title: {
    marginTop: 16,
    marginLeft: 24,
    height: 18,
    fontWeight: '600',
    lineHeight: 18,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    color: COLOR.blackColor,
  },
  info_detail_content: {
    marginTop: 16,
    marginLeft: 24,
    height: 24,
    //fontweight: '500',
    lineHeight: 24,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemBlackColor,
  },
  price_unit: {
    position: 'absolute',
    right: 24,
    fontWeight: '700',
    fontFamily: FONT.AN_Regular,
    fontSize: 16, 
    height: 16, 
    lineHeight: 16, 
    marginTop: 16, 
    color: COLOR.systemBlackColor,
  },
  line: {
    marginTop: 22,
    marginLeft: 24,
    marginRight: 24,
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaBlackColor20,
  },
});

const image_styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 22, 
    marginLeft: 24, 
    width: viewportWidth - 48,
  },
  image: { 
    width: 125, 
    height: 100, 
    borderRadius: 10,
  },
  content_container: {
    marginLeft: 12,
    marginTop: 16,
  },
  title: {
    width: '100%',
    height: 40,
    lineHeight: 20,
    color: COLOR.blackColor,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 14,
  },
  rating_container: {
    marginTop: 15,
    height: 15,
    flexDirection: 'row',
  },
  rating_text: {
    height: 15,
    lineHeight: 15,
    marginLeft: 5,
    fontWeight: '600',
    color: COLOR.blackColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
  arrow_container: {
    marginLeft: 24,
    width: 5,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
