import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  EmitterSubscription,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { 
  GooglePlaceData, 
  GooglePlaceDetail, 
  GooglePlacesAutocomplete, 
  GooglePlacesAutocompleteRef, 
} from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
  GOOGLE_MAP_KEY, 
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
  let keyboardDidShowListener: EmitterSubscription;
  let keyboardDidHideListener: EmitterSubscription;
  let googleAddressRef: GooglePlacesAutocompleteRef | null;
  let scrollViewRef: KeyboardAwareScrollView | null;

  const { goBack } = useNavigation();
  const { getUserInformation } = useUsers();
  const { setLoginUser } = useAuthentication();
  const { addCard } = usePayments();
  const keyboardDidShow = () => { setShowKeyboard(true); }
  const keyboardDidHide = () => { setShowKeyboard(false); }

  const [fullName, setFullName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiration, setCardExpiration] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  }, []);

  useEffect(() => {
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }
  }, []); 

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

  const selectAddress = (address: GooglePlaceData, details: GooglePlaceDetail | null) => {
    const street_number = details?.address_components.find((addressComponent) =>
      addressComponent.types.includes('street_number'),
    )?.long_name;    
    const route = details?.address_components.find((addressComponent) =>
      addressComponent.types.includes('route'),
    )?.long_name;
    let streetAddress = street_number != undefined ? street_number : '';
    if (route != undefined) {
      streetAddress.length > 0 ? streetAddress += ` ${route}` : streetAddress = route;
    }
    if (googleAddressRef != null) {
      googleAddressRef.setAddressText(streetAddress);
    }

    const neighborhood = details?.address_components.find((addressComponent) =>
      addressComponent.types.includes('neighborhood'),
    )?.long_name;
    const city = details?.address_components.find((addressComponent) =>
      addressComponent.types.includes('locality'),
    )?.long_name;
    if (neighborhood != undefined) {
      setCity(neighborhood);
    } else if (city != undefined) {
      setCity(city);
    } else {
      setCity('');
    }

    const state = details?.address_components.find((addressComponent) =>
      addressComponent.types.includes('administrative_area_level_1'),
    )?.long_name;
    setState(state != undefined ? state : '');

    const zipCode = details?.address_components.find((addressComponent) =>
      addressComponent.types.includes('postal_code'),
    )?.short_name;
    setZipCode(zipCode != undefined ? zipCode : '');

    const country = details?.address_components.find((addressComponent) =>
      addressComponent.types.includes('country'),
    )?.long_name;
    setCountry(country != undefined ? country : '');
  };

  const onEditGoogleAddress = () => {
    if (scrollViewRef != null) {
      scrollViewRef.scrollToPosition(0, 250, false);
    }
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>{ 'Add New Payment' }</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{flex: 1, marginTop: 33}}>
          <KeyboardAwareScrollView 
            ref={ref => { scrollViewRef = ref; }}
            style={{width: '100%', height: '100%', flex: 1}} 
            keyboardDismissMode="interactive" 
            keyboardShouldPersistTaps="always"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48}}>
                <View style={{width:'100%'}}>
                  <CustomText style={{...styles.info_title, fontSize: 16, fontWeight: '600'}}>Card Information</CustomText>
                </View>

                <View style={{width:'100%', marginTop: 10}}>
                  <CustomText style={styles.info_title}>Name On Card</CustomText>
                  <CustomTextInput
                    style={{...GlobalStyle.auth_input}}
                    placeholder={'Name On Card'}
                    placeholderTextColor={COLOR.alphaWhiteColor50}
                    onChangeText={text => setFullName(text)}
                    value={fullName}
                  />
                  <View style={{...GlobalStyle.auth_line}} />
                </View>

                <View style={{width:'100%', marginTop: 33}}>
                  <CustomText style={styles.info_title}>Card Number</CustomText>
                  <CustomTextInput
                    style={{...GlobalStyle.auth_input}}
                    placeholder={'1234 1234 1234 1234'}
                    keyboardType={'number-pad'}
                    maxLength={19}
                    placeholderTextColor={COLOR.alphaWhiteColor50}
                    onChangeText={text => setCardNumberValue(text)}
                    value={cardNumber}
                  />
                  <View style={{...GlobalStyle.auth_line}} />
                </View>

                <View style={{width:'100%', marginTop: 22, flexDirection: 'row'}}>
                  <View style={{width: (viewportWidth - 72) / 2}}>
                    <CustomText style={styles.info_title}>Experiation Date</CustomText>
                    <CustomTextInput
                      style={{...GlobalStyle.auth_input}}
                      placeholder={'MM/YY'}
                      keyboardType={'number-pad'}
                      maxLength={5}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setCardExpirationValue(text)}
                      value={cardExpiration}
                    />
                    <View style={{...GlobalStyle.auth_line}} />
                  </View>

                  <View style={{width: (viewportWidth - 72) / 2, marginLeft: 24}}>
                    <CustomText style={styles.info_title}>Security Code</CustomText>
                    <CustomTextInput
                      style={{...GlobalStyle.auth_input}}
                      placeholder={'CVC'}
                      keyboardType={'number-pad'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setCvc(text)}
                      maxLength={3}
                      value={cvc}
                    />
                    <View style={{...GlobalStyle.auth_line}} />
                  </View>
                </View>

                <View style={{width:'100%', marginTop: 33}}>
                  <CustomText style={{...styles.info_title, fontSize: 16, fontWeight: '600'}}>Billing Information</CustomText>
                </View>

                <View style={{width:'100%', marginTop: 33, zIndex: 10}}>
                  <CustomText style={styles.info_title}>Street Address</CustomText>
                    <GooglePlacesAutocomplete
                      ref={ref => {
                        googleAddressRef = ref; 
                      }}
                      placeholder='Search Location'
                      onPress={(data, details = null) => {
                        selectAddress(data, details);
                      }}
                      textInputProps={{
                        placeholder: 'Search Location',
                        placeholderTextColor: COLOR.alphaWhiteColor50,
                        onFocus: () => onEditGoogleAddress(),
                        onChangeText: () => onEditGoogleAddress(),
                      }}
                      fetchDetails={true}
                      styles={{
                        textInputContainer: {
                          backgroundColor: COLOR.clearColor,
                        },
                        textInput: {
                          height: 38,
                          color: COLOR.systemWhiteColor,
                          fontSize: 16,
                          paddingLeft: 0,
                          backgroundColor: COLOR.clearColor,
                        },
                        predefinedPlacesDescription: {
                          color: COLOR.alphaWhiteColor50,
                        },
                      }}
                      query={{
                        key: GOOGLE_MAP_KEY,
                        language: 'en',
                        components: 'country:us',
                        types: 'address',
                      }}
                    />
                  <View style={{...GlobalStyle.auth_line}} />
                </View>

                <View style={{width:'100%', marginTop: 22, flexDirection: 'row'}}>
                  <View style={{width: (viewportWidth - 72) / 2}}>
                    <CustomText style={styles.info_title}>City</CustomText>
                    <CustomTextInput
                      style={{...GlobalStyle.auth_input}}
                      placeholder={'City'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setCity(text)}
                      value={city}
                      editable={false}
                    />
                    <View style={{...GlobalStyle.auth_line}} />
                  </View>

                  <View style={{width: (viewportWidth - 72) / 2, marginLeft: 24}}>
                    <CustomText style={styles.info_title}>State</CustomText>
                    <CustomTextInput
                      style={{...GlobalStyle.auth_input}}
                      placeholder={'State'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setState(text)}
                      value={state}
                      editable={false}
                    />
                    <View style={{...GlobalStyle.auth_line}} />
                  </View>
                </View>

                <View style={{width:'100%', marginTop: 22, flexDirection: 'row'}}>
                  <View style={{width: (viewportWidth - 72) / 2}}>
                    <CustomText style={styles.info_title}>Zip Code</CustomText>
                    <CustomTextInput
                      style={{...GlobalStyle.auth_input}}
                      placeholder={'Zip Code'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setZipCode(text)}
                      value={zipCode}
                      editable={false}
                    />
                    <View style={{...GlobalStyle.auth_line}} />
                  </View>

                  <View style={{width: (viewportWidth - 72) / 2, marginLeft: 24}}>
                    <CustomText style={styles.info_title}>Country</CustomText>
                    <CustomTextInput
                      style={{...GlobalStyle.auth_input}}
                      placeholder={'Country'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setCountry(text)}
                      value={country}
                      editable={false}
                    />
                    <View style={{...GlobalStyle.auth_line}} />
                  </View>
                </View>

                <TouchableWithoutFeedback onPress={onAddPaymentMethod}>
                  <View style={styles.bottom_button}>
                    <ColorButton title={'Save Card'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
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
    color: COLOR.systemWhiteColor,
  },
});
