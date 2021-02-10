import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

let creditCardType = require("credit-card-type");

// from app
import { 
  CheckCardExpirationDate,
  COLOR, 
  CustomText, 
  CustomTextInput, 
  ERROR_MESSAGE, 
  FONT, 
  GetCardExpirationMonth, 
  GetCardExpirationYear, 
  Icon_Back,
  MARGIN_TOP,
  SUCCESS_MESSAGE,
  viewportWidth,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useGlobalState } from '../../redux/Store';
import { IUser } from '../../interfaces/app';
import { useAuthentication, usePayments, useUsers } from '../../hooks';
import GlobalStyle from '../../styles/global';


export const AddPaymentMethodScreen: React.FC = () => {

  const userInfo: IUser = useGlobalState('userInfo');
  let fetching = false;

  const { goBack } = useNavigation();
  const { getUserInformation } = useUsers();
  const { setLoginUser } = useAuthentication();
  const { addCard } = usePayments();

  const [fullName, setFullName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiration, setCardExpiration] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  const setCardExpirationValue = (text: string) => {
    let value = text;
    if (cardExpiration.length < text.length) {
      if (text.length == 2) {
        value = text + '/';
      }
    } else {
      if (text.length == 3) {
        value = text.substring(0, 1);
      }
    }
    setCardExpiration(value);
  }

  const loadUserInfo = async () => {
    await getUserInformation(userInfo.id)
    .then(async (result: Promise<IUser>) => {
      setLoginUser(await result);
    })
  }

  const setCardNumberValue = (text: string) => {
    let value = text;
    if (cardNumber.length < text.length) {
      if (text.length == 4 || text.length == 9 || text.length == 14) {
        value = text + ' ';
      }
    } else {
      if (text.length == 4 || text.length == 9 || text.length == 14) {
        value = text.substring(0, text.length - 1);
      }
    }
    setCardNumber(value);
  }

  const onAddPaymentMethod = () => {
    if (fetching == true) {
      return;
    } else if (fullName == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_FULL_NAME);
      return;
    } else if (cardNumber.length != 19) {
      Alert.alert('', ERROR_MESSAGE.EMPTY_CARD_NUMBER);
      return;
    } else if (cardExpiration.length != 5) {
      Alert.alert('', ERROR_MESSAGE.EMPTY_CARD_EXPIRATION);
      return;
    } else if (cvc.length != 3) {
      Alert.alert('', ERROR_MESSAGE.EMPTY_CVC);
      return;
    }

    const expYear = GetCardExpirationYear(cardExpiration);
    const expMonth = GetCardExpirationMonth(cardExpiration);

    if (CheckCardExpirationDate(expYear + 2000, expMonth) == false) {
      Alert.alert('', ERROR_MESSAGE.WRONG_CARD_EXPIRATION);
      return;
    }

    const cardDetails = {
      number: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc,
    }

    let visaCards = creditCardType(cardNumber);
    if (visaCards == null || visaCards == undefined || visaCards.length == 0) {
      Alert.alert('', ERROR_MESSAGE.WRONG_CARD_NUMBER);
      return;
    }
    let cardType = visaCards[0].niceType;

    let isAdded = false;
    for (let paymentMethod of userInfo.availableMethods) {
      if (paymentMethod.cardBrand == cardType && paymentMethod.expiryYear == expYear && paymentMethod.expiryMonth == expMonth) {
        if (paymentMethod.last4digits.length >= 4 && paymentMethod.last4digits.substring(0, 4) == cardNumber.substring(cardNumber.length - 4, cardNumber.length)) {
          isAdded = true;
          break;
        }
      }
    }

    if (isAdded == false) {
      if (userInfo.id != '') {
        fetching = true;
        addCard(fullName, cardNumber, expYear, expMonth, cvc)
        .then(() => {
          fetching = false;
          loadUserInfo();

          Alert.alert('', SUCCESS_MESSAGE.ADD_CARD_SUCCESS,
            [ { text: "OK", onPress: () => goBack() } ],
            { cancelable: false }
          );
        }).catch(() => {
          fetching = false;
          Alert.alert('', ERROR_MESSAGE.ADD_PAYMENT_METHOD_FAIL);
        });
      }
    }
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Add Payment Method</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{flex: 1}}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
            <ScrollView bounces={false}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                  <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48}}>
                    <View style={{width:'100%', marginTop: 33}}>
                      <CustomText style={styles.info_title}>Full Name</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'Full Name'}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setFullName(text)}
                        value={fullName}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>
                  </View>

                  <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48}}>
                    <View style={{width:'100%', marginTop: 33}}>
                      <CustomText style={styles.info_title}>Card Number</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'1234 1234 1234 1234'}
                        keyboardType={'number-pad'}
                        maxLength={19}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setCardNumberValue(text)}
                        value={cardNumber}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>Card Expiration</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'MM/YY'}
                        keyboardType={'number-pad'}
                        maxLength={5}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setCardExpirationValue(text)}
                        value={cardExpiration}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>CVC</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'CVC'}
                        keyboardType={'number-pad'}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setCvc(text)}
                        maxLength={3}
                        value={cvc}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>

                    <TouchableWithoutFeedback onPress={onAddPaymentMethod}>
                      <View style={styles.bottom_button}>
                        <ColorButton title={'Add Card'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
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
    fontWeight: '600' ,
    fontSize: 24, 
    textAlign: 'center',
    color: COLOR.systemWhiteColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  bottom_button: {
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 30,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
  info_title: {
    width: '100%',
    height: 23,
    lineHeight: 23,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    fontWeight: '600',
    color: COLOR.alphaWhiteColor75,
  },
});
