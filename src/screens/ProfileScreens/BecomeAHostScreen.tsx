import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Keyboard,
  Alert,
  EmitterSubscription,
} from 'react-native';
import { 
  GooglePlaceData, 
  GooglePlaceDetail, 
  GooglePlacesAutocomplete, 
  GooglePlacesAutocompleteRef, 
} from 'react-native-google-places-autocomplete';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase';


// from app
import { 
  COLOR, 
  convertDateToMomentDateFormat, 
  CustomText, 
  CustomTextInput, 
  EMAIL_LOGIN, 
  ERROR_MESSAGE, 
  FONT, 
  GOOGLE_MAP_KEY, 
  Icon_Back,
  Icon_Camera,
  Icon_Normal_Profile,
  LOGIN_STATE,
  MARGIN_TOP,
  SUCCESS_MESSAGE,
  ValidateEmail,
  viewportWidth,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useGlobalState } from '../../redux/Store';
import { IFile, IUser } from '../../interfaces/app';
import { useAuthentication, useUsers } from '../../hooks';
import GlobalStyle from '../../styles/global';


export const BecomeAHostScreen: React.FC = () => {

  let fetchingData = false;
  let keyboardDidShowListener: EmitterSubscription;
  let keyboardDidHideListener: EmitterSubscription;
  let googleAddressRef: GooglePlacesAutocompleteRef | null;
  let scrollViewRef: KeyboardAwareScrollView | null;
  const profile: IUser = useGlobalState('userInfo');

  const { goBack, navigate } = useNavigation();
  const { updateUserInformation } = useUsers();
  const { setLoginUser } = useAuthentication();

  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<string>(profile.avatarUrl);
  const [fullName, setFullName] = useState<string>(profile.fullname);
  const [emailAddress, setEmailAddress] = useState<string>(profile.email);
  const [aboutMe, setAboutMe] = useState<string>(profile.aboutMe);
  const [avatarFile, setAvatarFile] = useState<IFile | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [mode, setMode] = useState<"date" | "time" | undefined>('date');
  const [pickerDate, setPickerDate] = useState<Date>(profile.dateOfBirth == undefined || profile.dateOfBirth == '' ? new Date() : new Date(profile.dateOfBirth));
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

  
  useEffect(() => {
    setImage(profile.avatarUrl);
    setFullName(profile.fullname);
    setEmailAddress(profile.email);
    setAboutMe(profile.aboutMe);
    setPickerDate(profile.dateOfBirth == undefined || profile.dateOfBirth == '' ? new Date() : new Date(profile.dateOfBirth));
  }, [profile]);

  const selectAddress = (address: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (googleAddressRef != null) {
      googleAddressRef.setAddressText(address.description.replace(', USA', ''));
    }
  };

  const keyboardDidShow = () => {
    setShowKeyboard(true);
  }

  const keyboardDidHide = () => {
    setShowKeyboard(false);
  }

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    if (googleAddressRef != null && profile.location != undefined) {
      googleAddressRef.setAddressText(profile.location);
    }
  }, []);

  useEffect(() => {
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }
  }, []);  

  const onSelectPhoto = () => {
    onChoosePhoto();
  }

  const onChoosePhoto = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: false,
      cropping: true,
      mediaType: "photo",
      width: 200,
      height: 200,
    })
    .then((image) => {
      const file = {
        name: 'avatar.jpg',
        type: image.mime,
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
      };
      setAvatarFile(file);
      setImage(file.uri);
    })
    .catch((e) => {});
  }

  const onTakePicture = () => {
    ImagePicker.openCamera({
      includeBase64: true,
      multiple: false,
      cropping: true,
      mediaType: "photo",
      width: 200,
      height: 200,
    })
    .then((image) => {
      const file: IFile = {
        name: 'avatar.jpg',
        type: image.mime,
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
      };
      setAvatarFile(file);
      setImage(file.uri);
    })
    .catch((e) => {
    });
  }

  const onEditGoogleAddress = () => {
    if (scrollViewRef != null) {
      scrollViewRef.scrollToPosition(0, 650, false);
    }
  }

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    setPickerDate(date);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const getPickerDate = (): Date => {
    var date = new Date(pickerDate);
    date.setHours(date.getHours() + 7, 0, 0, 0);
    return date;
  }

  const onBecomeAHost = async () => {
    if (fetchingData == true) {
      return;
    }
    fetchingData = true;

    let locationString = '';
    if (googleAddressRef != null) {
      locationString = googleAddressRef.getAddressText();
    }
    if (locationString == null || locationString == undefined) {
      locationString = '';
    }
    const location = locationString;

    if (fullName == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_FULL_NAME);
      return;
    } else if (emailAddress == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EMAIL_ADDRESS);
      return;
    } else if (ValidateEmail(emailAddress) == false) {
      Alert.alert('', ERROR_MESSAGE.INVALID_EMAIL_ADDRESS);
      return;
    } else if (aboutMe == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_ABOUTME);
      return;
    } else if (location == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_LOCATION);
      return;
    }

    setUploading(true);
    if (avatarFile != null) {
      const filename = profile.randomString;
      const uploadUri = avatarFile.uri;

      const response = await fetch(uploadUri);
      const blob = await response.blob();

      const uploadTask = firebase.storage().ref(`images/${filename}.jpg`).put(blob);
      try {
        await uploadTask;
        firebase.storage()
          .ref('images')
          .child(`${filename}.jpg`)
          .getDownloadURL()
          .then((url) => {
            saveProfile(url, location);
          });
      } catch (e) {
        fetchingData = false;
        setUploading(false);
        Alert.alert('', ERROR_MESSAGE.UPDATE_USER_PROFILE_FAIL);
        return;
      }
    } else {
      saveProfile('', location);
    }
  }

  const saveProfile = (avatarUrl: string, location: string) => {
    updateUserInformation(profile.randomString, emailAddress, fullName, convertDateToMomentDateFormat(pickerDate, 'MM-DD-YYYY'), aboutMe, location, '', avatarUrl, true)
    .then(async (result: Promise<IUser>) => {
      fetchingData = false;
      setUploading(false);
      setLoginUser(await result);
      Alert.alert('',
        SUCCESS_MESSAGE.USER_BECOM_A_HOST,
        [
          { text: "OK", onPress: () => {
            goBack();
            navigate('Withdrawal');
          }}
        ],
        { cancelable: false }
      );
    }).catch(() => {
      fetchingData = false;
      setUploading(false);
      Alert.alert('', ERROR_MESSAGE.UPDATE_USER_PROFILE_FAIL);
    });
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Become A Host</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{flex: 1}}>
          <KeyboardAwareScrollView 
            ref={ref => { scrollViewRef = ref; }}
            style={{width: '100%', height: '100%', flex: 1}} 
            keyboardDismissMode="interactive" 
            keyboardShouldPersistTaps="always"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View>
                <View style={styles.profile_container}>
                  <TouchableWithoutFeedback onPress={() => onSelectPhoto()}>
                    <View style={styles.profile}>
                      { image != ''
                        ? <Image style={{width: '100%', height: '100%'}} source={{uri: image}} />
                        : <View style={styles.profile_no_image}>
                            <SvgXml width={46} height={58} xml={Icon_Normal_Profile} />
                          </View>
                      }
                      <LinearGradient
                        colors={['#00000010', '#00000070']}
                        style={styles.camera_container}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}} >
                        <View style={styles.camera_icon}>
                          <SvgXml width='100%' height='100%' xml={Icon_Camera} />
                        </View>
                      </LinearGradient>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48}}>
                  <View style={{width:'100%', marginTop: 33}}>
                    <CustomText style={styles.info_title}>Full Name</CustomText>
                    <CustomTextInput
                      style={GlobalStyle.auth_input}
                      placeholder={'Full Name'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setFullName(text)}
                      value={fullName}
                      onSubmitEditing={event => {}}
                    />
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <View style={{width:'100%', marginTop: 22}}>
                    <CustomText style={styles.info_title}>Email Address</CustomText>
                    <CustomTextInput
                      style={{...GlobalStyle.auth_input, color: LOGIN_STATE == EMAIL_LOGIN ? COLOR.systemWhiteColor : COLOR.alphaWhiteColor50}}
                      keyboardType={'email-address'}
                      placeholder={'Email Address'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setEmailAddress(text)}
                      value={emailAddress}
                      editable={LOGIN_STATE == EMAIL_LOGIN ? true : false}
                    />
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <View style={{width:'100%', marginTop: 22}}>
                    <CustomText style={styles.info_title}>Date of Birth</CustomText>
                    <TouchableWithoutFeedback onPress={() => setShowDatePicker(true) }>
                      <CustomText style={{...GlobalStyle.auth_input, color: COLOR.systemWhiteColor, lineHeight: 45}}>
                        { convertDateToMomentDateFormat(pickerDate, 'MM-DD-YYYY') }
                      </CustomText>
                    </TouchableWithoutFeedback>
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <View style={{width:'100%', marginTop: 22}}>
                    <CustomText style={styles.info_title}>About Me</CustomText>
                    <CustomTextInput
                      style={GlobalStyle.auth_input}
                      placeholder={'About Me'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setAboutMe(text)}
                      value={aboutMe}
                    />
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <View style={{width:'100%', marginTop: 22}}>
                    <CustomText style={styles.info_title}>Location</CustomText>
                    <View style={{marginLeft: -10, width: viewportWidth - 28, height: showKeyboard == false ? 45 : 230}}>
                      <GooglePlacesAutocomplete
                        placeholder='Location'
                        onPress={(data, details = null) => {
                          selectAddress(data, details);
                        }}
                        ref={ref => googleAddressRef = ref}
                        textInputProps={{
                          placeholder: 'Location',
                          placeholderTextColor: COLOR.alphaWhiteColor50,
                          onFocus: () => onEditGoogleAddress(),
                          onChangeText: () => onEditGoogleAddress(),
                        }}
                        styles={{
                          textInputContainer: {
                            backgroundColor: COLOR.clearColor,
                          },
                          textInput: {
                            height: 38,
                            color: COLOR.systemWhiteColor,
                            fontSize: 16,
                            backgroundColor: COLOR.clearColor,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}
                        query={{
                          key: GOOGLE_MAP_KEY,
                          language: 'en',
                          components: 'country:us',
                        }}
                      />
                    </View>
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <TouchableWithoutFeedback onPress={() => onBecomeAHost() }>
                    <View style={styles.bottom_button}>
                      <ColorButton title={'Become A Host'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>

      <DateTimePickerModal
        headerTextIOS='Select Birthday'
        date={getPickerDate()}
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Spinner
        visible={uploading}
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
    fontWeight: '600',
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
    position: 'absolute', 
    top: 0, 
    bottom: 0,
  },
  profile_container: {
    width: '100%',
    height: 150,
    marginTop: 33,
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
    fontWeight: '600',
    fontSize: 12,
    color: COLOR.alphaWhiteColor75,
  },
  datePickerBackground: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    width: '100%',
    height: 150,
    backgroundColor: COLOR.whiteColor,
  },
  datePickerContainer: {
    flexDirection: 'row', 
    marginTop: 15, 
    marginLeft: 15, 
    width: viewportWidth - 30,
  },
  datePicker: {
    alignContent: 'center',
    marginTop: 3,
    width: viewportWidth - 30,
  },
  datePickerConfirm: {
    position: 'absolute',
    right: 0,
    width: 100,
    height: 35,
    borderColor: COLOR.alphaBlackColor20,
    borderWidth: 1,
    borderRadius: 10,
  },
  confirm_text: {
    width: '100%',
    height: 35,
    lineHeight: 35,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.blueColor,
  },
  autocompleteContainer: {
    zIndex: 100,
    borderColor: COLOR.clearColor,
    borderWidth: 0,
  },
  autocompleteInput: {
    borderColor: COLOR.clearColor,
    borderWidth: 0,
  },
  autocomplete: {
    backgroundColor: COLOR.clearColor,
    borderColor: COLOR.clearColor,
    borderWidth: 0,
    height: 45,
    color: COLOR.systemWhiteColor,
    paddingLeft: 25,
  },
  autocompleteContent: {
    height: 35,
    lineHeight: 35,
    fontFamily: FONT.AN_Regular,
    paddingLeft: 20, 
    backgroundColor: COLOR.systemWhiteColor, 
    color: COLOR.systemBlackColor,
  },
});
