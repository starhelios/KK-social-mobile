import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import DefaultPreference from 'react-native-default-preference';

// from app
import { 
  COLOR, 
  EMAIL_LOGIN, 
  ERROR_MESSAGE, 
  FONT, Icon_Back, 
  Img_Auth_Background, 
  IS_FIRST_LOGIN, 
  LOGIN_TYPE, 
  MARGIN_TOP, 
  PASSWORD, 
  USER_EMAIL, 
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useAuthentication } from '../../hooks';
import { IApiError } from '../../interfaces/api';
import GlobalStyle from '../../styles/global';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const SignUpScreen: React.FC = () => {

  const { navigate, goBack } = useNavigation();
  const { registerUser } = useAuthentication();

  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  var fetching = false;

  useEffect(() => {
  }, [])

  return (
    <Container style={styles.background}>
      <Image style={{width: viewportWidth, height: viewportHeight, resizeMode: 'cover'}} source={Img_Auth_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Sign Up</Text>

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
                    <Text style={styles.info_title}>Full Name</Text>
                    <TextInput
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
                    <Text style={styles.info_title}>Email Address</Text>
                    <TextInput
                      style={GlobalStyle.auth_input}
                      keyboardType={'email-address'}
                      placeholder={'Email Address'}
                      placeholderTextColor={COLOR.alphaWhiteColor50}
                      onChangeText={text => setEmailAddress(text)}
                      value={emailAddress}
                    />
                    <View style={GlobalStyle.auth_line} />
                  </View>

                  <View style={{width:'100%', marginTop: 22}}>
                    <Text style={styles.info_title}>Password</Text>
                    <TextInput
                      style={GlobalStyle.auth_input}
                      placeholder={'Password'}
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
    </Container>
  );

  function onCreateAccount() {
    if (fetching == true) {
      return;
    } if (fullName == '') {
      Alert.alert(ERROR_MESSAGE.EMPTY_FULL_NAME);
      return;
    } else if (emailAddress == '') {
      Alert.alert(ERROR_MESSAGE.EMPTY_EMAIL_ADDRESS);
      return;
    } else if (password == '') {
      Alert.alert(ERROR_MESSAGE.EMPTY_PASSWORD);
      return;
    }
    fetching = true;

    registerUser(fullName, emailAddress, password)
    .then(async (result: Promise<Boolean>) => {
      fetching = false;
      if ((await result) == true) {
        saveUserInfo();
        navigate('SignUpAddProfilePicture');
      } else {
        Alert.alert(ERROR_MESSAGE.REGISTER_FAIL);
      }
    }).catch(async (error: Promise<IApiError>) => {
      fetching = false;
      Alert.alert((await error).error.message);
    }).catch(() => {
      fetching = false;
      Alert.alert(ERROR_MESSAGE.REGISTER_FAIL);
    });
  }

  function saveUserInfo() {
    DefaultPreference.set(LOGIN_TYPE, EMAIL_LOGIN).then(function() { });
    DefaultPreference.set(USER_EMAIL, emailAddress).then(function() { });
    DefaultPreference.set(PASSWORD, password).then(function() { });
    DefaultPreference.get(IS_FIRST_LOGIN).then(function(is_first_login) {
      if (is_first_login != null && is_first_login == 'false') {
      } else {
        DefaultPreference.set(IS_FIRST_LOGIN, 'false').then(function() { });
      }
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
  bottom_button: {
    position: 'absolute',
    // top: viewportHeight - 77,
    bottom: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
  },
});
