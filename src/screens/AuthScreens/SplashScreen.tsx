import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { Container } from 'native-base';
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import DefaultPreference from 'react-native-default-preference';

// from app
import { 
  COLOR,
  LOADING_TIME,
  Img_Splash_Background, 
  Icon_Tab_Bar_Booking_Select,
  LOGIN_TYPE,
  EMAIL_LOGIN,
  USER_EMAIL,
  PASSWORD,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  APPLE_LOGIN,
  ACCESS_TOKEN,
  CODE,
  setUserToken,
} from '../../constants';
import { useAuthentication } from '../../hooks';
import { ILoginUser } from '../../interfaces/app';
import { ActionType } from '../../redux/Reducer';
import { useDispatch } from '../../redux/Store';

export const SplashScreen: React.FC = () => {

  const { navigate } = useNavigation();
  const { loginUser } = useAuthentication();
  const dispatch = useDispatch();

  var autoLogin = false;

  useEffect(() => {
    loadAutoLoginInformation();

    setTimeout(() => {
      if (autoLogin == false) {
        goMainScreen();
      }
    }, LOADING_TIME)
  }, [])

  function loadAutoLoginInformation() {
    DefaultPreference.get(LOGIN_TYPE).then(function(loginType) {
      if (loginType == EMAIL_LOGIN) {
        DefaultPreference.get(USER_EMAIL).then(function(emailAddress) {
          if (emailAddress != null && emailAddress != '') {
            DefaultPreference.get(PASSWORD).then(function(passwordString) {
              if (passwordString != null && passwordString != '') {
                onAutoLoginByEmail(emailAddress, passwordString);
              }
            });
          }
        });

      } else if (loginType == FACEBOOK_LOGIN || loginType == GOOGLE_LOGIN || loginType == APPLE_LOGIN) {
        DefaultPreference.get(ACCESS_TOKEN).then(function(accessToken) {
          if (accessToken != null && accessToken != '') {
            DefaultPreference.get(CODE).then(function(code) {
              if (code != null && code != '') {
                onAutoLoginBySocial(loginType, accessToken, code);
              }
            });
          }
        });
      }
    });
  }

  const onAutoLoginByEmail = useCallback(async (emailAddress: string, passwordString: string): Promise<void> => {
    autoLogin = true;

    loginUser(emailAddress, passwordString)
    .then(async (result: Promise<ILoginUser>) => {
      const user = (await result).user;
      dispatch({
        type: ActionType.SET_USER_INFO,
        payload: {
          id: user.id,
          isHost: user.isHost,
          email: user.email,
          fullname: user.fullname,
          status: user.status,
          image: user.image,
          birthday: user.birthday,
        },
      });
      setUserToken((await result).tokens.access.token);
      goMainScreen();
    }).catch(() => {
      goMainScreen();
    });
  }, []);

  const onAutoLoginBySocial = useCallback(async (loginType: string, accessToken: string, code: string): Promise<void> => {
    autoLogin = true;
    goMainScreen();
  }, []);

  function goMainScreen() {
    navigate('TabBar');
  }

  return (
    <Container style={styles.background}>
      <Image style={styles.background_image} source={Img_Splash_Background} />
      
      <View style={styles.icon} >
        <SvgXml width={75} height={130} xml={Icon_Tab_Bar_Booking_Select} />
      </View>
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
  background_image: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    width: 75,
    height: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
  }
});
