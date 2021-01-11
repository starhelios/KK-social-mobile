import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import Spinner from 'react-native-loading-spinner-overlay';

// from app
import { COLOR, CustomTextInput, ERROR_MESSAGE, FONT, Icon_Back, Img_Auth_Background, MARGIN_TOP } from '../../constants';
import { ColorButton } from '../../components/Button';
import { useAuthentication } from '../../hooks';
import { IApiError, IApiSuccessMessage } from '../../interfaces/api';
import GlobalStyle from '../../styles/global';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const ForgotPasswordScreen: React.FC = () => {

  const { goBack } = useNavigation();
  const { forgotPassword } = useAuthentication();

  const [emailAddress, setEmailAddress] = useState('');
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  return (
    <Container style={styles.background}>
      
      <Image style={{width: viewportWidth, height: viewportHeight, resizeMode: 'cover'}} source={Img_Auth_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Forgot Password</Text>

          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.input_container}>
              <View style={{width:'100%', marginTop: 22}}>
                <Text style={styles.info_title}>Email Address</Text>
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
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.bottom_container}>
          <Text style={styles.bottom_description}>We will send a password reset email</Text>
          <Text style={styles.bottom_description}>to the address above.</Text>

          <TouchableWithoutFeedback onPress={() => onForgotPassword() }>
            <View style={styles.bottom_button}>
              <ColorButton title={'Confirm'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>

      <Spinner
        visible={fetchingData}
        textContent={''}
        textStyle={{color: COLOR.systemWhiteColor}}
      />
    </Container>
  );

  function onForgotPassword() {
    if (fetchingData == true) {
      return;
    } else if (emailAddress == '') {
      Alert.alert(ERROR_MESSAGE.EMPTY_EMAIL_ADDRESS);
      return;
    }
    setFetchingData(true);

    forgotPassword(emailAddress)
    .then(async (result: Promise<IApiSuccessMessage>) => {
      setFetchingData(false);
      if ((await result).error == false) {
        Alert.alert((await result).message);
      } else {
        Alert.alert((await result).message);
      }
    }).catch(async (error: Promise<IApiError>) => {
      setFetchingData(false);
      Alert.alert((await error).error.message);
    }).catch(() => {
      setFetchingData(false);
      Alert.alert(ERROR_MESSAGE.FORGOT_PASSWORD_FAIL);
    });
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
    fontFamily: FONT.AN_Bold, 
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
    fontSize: 14,
    color: COLOR.systemWhiteColor,
  },
  bottom_container: {
    position: 'absolute',
    flexDirection: 'column',
    width: '100%',
    bottom: 33,
  },
  bottom_description: {
    height: 17,
    lineHeight: 17,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.alphaWhiteColor50,
    textAlign: 'center',
  },
  bottom_button: {
    marginTop: 22,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
});
