import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';

// from app
import { 
  CheckCardExpirationDate,
  COLOR, 
  convertStringToDateFormat, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  Icon_Back_Black,
  Icon_Experience_Rating,
  Img_Experience,
  MARGIN_TOP,
  SUCCESS_MESSAGE,
  viewportWidth,
} from '../../constants';
import { ColorButton, TitleArrowButton } from '../../components/Button';
import { ISpecificExperience, IHostDetail, IUser, ICardInfo, IExperienceDetail, IUserBooking } from '../../interfaces/app';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { useExperiences, usePayments } from '../../hooks';
import { ActionType } from '../../redux/Reducer';
import { useStripePaymentIntents } from '../../constants/stripe/useStripePaymentIntents';
import { IStripePaymentIntent } from '../../constants/stripe/StripePaymentIntent';


export const ExperienceDetailConfirmPayScreen: React.FC = ({route}) => {

  const userInfo: IUser = useGlobalState('userInfo');
  const selectedCard: ICardInfo = useGlobalState('selectedCard');

  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const { generatePaymentIntent, saveTransation } = usePayments();
  const { reserveBooking, getReservedBookingList } = useExperiences();
  const { confirmPaymentIntent } = useStripePaymentIntents();

  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const experienceDetail: IExperienceDetail = route.params.experienceDetail;
  const availableDate: ISpecificExperience = route.params.availableDate;
  const guestCount: number = route.params.guestCount;
  const hostDetail: IHostDetail = route.params.hostDetail;
  const host: IUser = hostDetail.user;

  let fetching = false;

  const onConfirmPay = async () => {
    if (fetching == true) {
      return;
    }

    if (selectedCard.cardBrand == '' || selectedCard.last4digits == '') {
      Alert.alert('', ERROR_MESSAGE.UNSELECT_CARD);
      return;
    }

    if (CheckCardExpirationDate(selectedCard.expiryYear, selectedCard.expiryMonth) == false) {
      Alert.alert('', ERROR_MESSAGE.PASSED_CARD_EXPIRATION);
      return;
    }

    fetching = true;
    setShowSpinner(true);
    let payment_type = 'saved'; // 'card'
    await generatePaymentIntent(experienceDetail.id, Math.floor(experienceDetail.price * guestCount * 100), payment_type)
    .then(async (clientToken: Promise<string>) => {
      confirmCardPayment(await clientToken);
    })
    .catch(async (message: Promise<string>) => {
      fetching = false;
      setShowSpinner(false);
      Alert.alert('', await message);
    })
    .catch(() => {
      fetching = false;
      setShowSpinner(false);
      Alert.alert('', ERROR_MESSAGE.PAYMENT_FAIL);
    });
  }

  const confirmCardPayment = async (client_secret: string) => {
    const paymentIntentInfo = client_secret.split('_secret_');
    if (paymentIntentInfo.length != 2) {
      fetching = false;
      setShowSpinner(false);
      return;
    }

    await confirmPaymentIntent(paymentIntentInfo[0], userInfo.email)
    .then(async (paymentIntent: IStripePaymentIntent) => {
      onReserveBooking(client_secret, (await paymentIntent).id);
    })
    .catch(async (message: Promise<string>) => {
      fetching = false;
      setShowSpinner(false);
      Alert.alert('', await message);
    })
    .catch(() => {
      fetching = false;
      setShowSpinner(false);
      Alert.alert('', ERROR_MESSAGE.PAYMENT_FAIL);
    })
  }

  const onReserveBooking = async (client_secret: string, paymentIntentId: string) => {
    await saveTransation(client_secret, paymentIntentId, userInfo.randomString, experienceDetail.id)
      .then(() => {
      })
      .catch(() => {
      })

    await reserveBooking(userInfo.randomString, experienceDetail.id, availableDate.id, paymentIntentId, guestCount, experienceDetail.images.length > 0 ? experienceDetail.images[0] : '')
    .then(() => {
      fetching = false;
      setShowSpinner(false);
      
      getReservedBookingList(userInfo.randomString)
      .then(async (result: Promise<IUserBooking[]>) => {
        dispatch({
          type: ActionType.SET_RESERVED_BOOKING_LIST,
          payload: await result,
        })
      })

      Alert.alert('', SUCCESS_MESSAGE.RESERVATION_BOOKING_SUCCESS,
        [ { text: "OK", onPress: () => goBack() } ],
        { cancelable: false }
      );
    })
    .catch(() => {
      fetching = false;
      setShowSpinner(false);
    })
  }

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
              source={experienceDetail.images.length > 0 ? {uri: experienceDetail.images[0]} : Img_Experience} />

            <View style={{...image_styles.content_container, width: viewportWidth - 89}}>
              <CustomText style={image_styles.title} numberOfLines={2}>{experienceDetail.title}</CustomText>

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
            <CustomText style={styles.info_detail_content}>{'$' + experienceDetail.price + ' x ' + guestCount.toString() + ' person'}</CustomText>
            <CustomText style={styles.price_unit}>{'$' + Math.floor(experienceDetail.price * guestCount).toString()}</CustomText>
          </View>
          <View style={styles.line} />

          <CustomText style={styles.info_title}>Payment</CustomText>
          <TouchableWithoutFeedback onPress={() => navigate('PaymentOptions') }>
            <View style={{marginLeft: 24, width: viewportWidth - 48, marginTop: 16}}>
              <TitleArrowButton title={'Credit Card'} name={`${selectedCard.cardBrand} ${selectedCard.last4digits}`} showArrow={true} white_color={false} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onConfirmPay}>
            <View style={styles.bottom_button}>
              <ColorButton title={'Confirm & Pay'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>

      <Spinner
        visible={showSpinner}
        textContent={''}
        textStyle={{color: COLOR.systemWhiteColor}}
      />
    </Container>
  );
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
    marginTop: 22,
    marginBottom: 33,
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
    //fontWeight: '500',
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
