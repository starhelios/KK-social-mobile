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

// from app
import { COLOR, ERROR_MESSAGE, FONT, Icon_Back, Img_Auth_Background, MARGIN_TOP } from '../../constants';
import { ColorButton } from '../../components/Button';
import { useAuthentication } from '../../hooks';
import { IApiError, IApiSuccess } from '../../interfaces/api';
import { IUser } from '../../interfaces/app';
import { useGlobalState } from '../../redux/Store';
import GlobalStyle from '../../styles/global';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const ChangePasswordScreen: React.FC = () => {

  const { goBack } = useNavigation();
  const { changePassword } = useAuthentication();

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const userInfo: IUser = useGlobalState('userInfo');

  var fetching = false;

  return (
    <Container style={styles.background}>
      
      <Image style={{width: viewportWidth, height: viewportHeight, resizeMode: 'cover'}} source={Img_Auth_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Change Password</Text>

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
                <Text style={styles.info_title}>Current Password</Text>
                <TextInput
                  style={GlobalStyle.auth_input}
                  placeholder={'Current Password'}
                  secureTextEntry={true}
                  autoCapitalize='none'
                  placeholderTextColor={COLOR.alphaWhiteColor50}
                  onChangeText={text => setCurrentPassword(text)}
                  value={currentPassword}
                />
                <View style={GlobalStyle.auth_line} />
              </View>

              <View style={{width:'100%', marginTop: 22}}>
                <Text style={styles.info_title}>New Password</Text>
                <TextInput
                  style={GlobalStyle.auth_input}
                  placeholder={'New Password'}
                  secureTextEntry={true}
                  autoCapitalize='none'
                  placeholderTextColor={COLOR.alphaWhiteColor50}
                  onChangeText={text => setNewPassword(text)}
                  value={newPassword}
                />
                <View style={GlobalStyle.auth_line} />
              </View>

              <View style={{width:'100%', marginTop: 22}}>
                <Text style={styles.info_title}>Confirm Password</Text>
                <TextInput
                  style={GlobalStyle.auth_input}
                  placeholder={'Confirm Password'}
                  secureTextEntry={true}
                  autoCapitalize='none'
                  placeholderTextColor={COLOR.alphaWhiteColor50}
                  onChangeText={text => setConfirmPassword(text)}
                  value={confirmPassword}
                />
                <View style={GlobalStyle.auth_line} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.bottom_container}>
          <TouchableWithoutFeedback onPress={() => onChangePassword() }>
            <View style={styles.bottom_button}>
              <ColorButton title={'Confirm'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </Container>
  );

  function onChangePassword() {
    if (fetching == true) {
      return;
    } else if (currentPassword == '') {
      Alert.alert(ERROR_MESSAGE.EMPTY_CURRENT_PASSWORD);
      return;
    } else if (newPassword == '') {
      Alert.alert(ERROR_MESSAGE.EMPTY_NEW_PASSWORD);
      return;
    } else if (confirmPassword == '') {
      Alert.alert(ERROR_MESSAGE.EMPTY_CONFIRM_PASSWORD);
      return;
    } else if (newPassword != confirmPassword) {
      Alert.alert(ERROR_MESSAGE.MISMATCH_PASSWORD);
      return;
    }
    fetching = true;

    changePassword(userInfo.id, currentPassword, newPassword, true)
    .then(async (result: Promise<IApiSuccess>) => {
      fetching = false;
      if ((await result).error.status == false) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        Alert.alert((await result).error.message);
      } else {
        Alert.alert((await result).error.message);
      }
    }).catch(async (error: Promise<IApiError>) => {
      fetching = false;
      Alert.alert((await error).error.message);
    }).catch(() => {
      fetching = false;
      Alert.alert(ERROR_MESSAGE.CHANGE_PASSWORD_FAIL);
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
