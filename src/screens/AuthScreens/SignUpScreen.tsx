import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

// from app
import { 
  COLOR, 
  CustomText, 
  CustomTextInput, 
  EMAIL_LOGIN, 
  ERROR_MESSAGE, 
  FONT, Icon_Back, 
  Img_Auth_Background, 
  IS_FIRST_LOGIN, 
  LOGIN_TYPE, 
  MARGIN_TOP, 
  PASSWORD, 
  USER_EMAIL,
  viewportHeight,
  viewportWidth, 
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useAuthentication } from '../../hooks';
import { IApiError } from '../../interfaces/api';
import GlobalStyle from '../../styles/global';
import Spinner from 'react-native-loading-spinner-overlay';


export const SignUpScreen: React.FC = () => {

  const { reset, goBack } = useNavigation();
  const { registerUser } = useAuthentication();

  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  const onCreateAccount = () => {
    if (fetchingData == true) {
      return;
    } if (fullName == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_FULL_NAME);
      return;
    } else if (emailAddress == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EMAIL_ADDRESS);
      return;
    } else if (password == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_PASSWORD);
      return;
    }
    setFetchingData(true);

    registerUser(fullName, emailAddress, password)
    .then(async (result: Promise<Boolean>) => {
      setFetchingData(false);
      if ((await result) == true) {
        saveUserInfo();
        reset({
          index: 0,
          routes: [{ name: 'SignUpAddProfilePicture' }],
        });
      } else {
        Alert.alert('', ERROR_MESSAGE.REGISTER_FAIL);
      }
    }).catch(async (error: Promise<IApiError>) => {
      setFetchingData(false);
      Alert.alert('', (await error).error.message);
    }).catch(() => {
      setFetchingData(false);
      Alert.alert('', ERROR_MESSAGE.REGISTER_FAIL);
    });
  }

  const saveUserInfo = async () => {
    await AsyncStorage.setItem(LOGIN_TYPE, EMAIL_LOGIN);
    await AsyncStorage.setItem(USER_EMAIL, emailAddress);
    await AsyncStorage.setItem(PASSWORD, password);
    AsyncStorage.getItem(IS_FIRST_LOGIN).then(async (is_first_login) => {
      if (is_first_login != null && is_first_login == 'false') {
      } else {
        await AsyncStorage.setItem(IS_FIRST_LOGIN, 'false');
      }
    });
  }

  return (
    <Container style={styles.background}>
      <Image style={{width: viewportWidth, height: viewportHeight, resizeMode: 'cover'}} source={Img_Auth_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Sign Up</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
              <ScrollView>
                <View style={styles.input_container}>
                  <View style={{width:'100%'}}>
                    <CustomText style={styles.info_title}>Full Name</CustomText>
                    <CustomTextInput
                      style={GlobalStyle.auth_input}
                      numberOfLines={1}
                      scrollEnabled={false}
                      placeholder={'Full Name'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setFullName(text)}
                      value={fullName}
                    />
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <View style={{width:'100%', marginTop: 22}}>
                    <CustomText style={styles.info_title}>Email Address</CustomText>
                    <CustomTextInput
                      style={GlobalStyle.auth_input}
                      keyboardType={'email-address'}
                      placeholder={'Email Address'}
                      autoCapitalize='none'
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setEmailAddress(text)}
                      value={emailAddress}
                    />
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <View style={{width:'100%', marginTop: 22}}>
                    <CustomText style={styles.info_title}>Password</CustomText>
                    <CustomTextInput
                      style={GlobalStyle.auth_input}
                      placeholder={'Password'}
                      autoCapitalize='none'
                      secureTextEntry={true}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setPassword(text)}
                      value={password}
                    />
                    <View style={GlobalStyle.auth_line} />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback onPress={() => onCreateAccount() }>
          <View style={styles.bottom_button}>
            <ColorButton title={'Create Account'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <Spinner
        visible={fetchingData}
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
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  input_container: {
    marginLeft: 24, 
    marginRight: 24, 
    marginTop: 35, 
    flexDirection: 'column',
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
  bottom_button: {
    position: 'absolute',
    bottom: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
  },
});
