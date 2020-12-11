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
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';
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
} from '../../constants';
import { useAuthentication } from '../../hooks';
import { ILoginUser } from '../../interfaces/app';

export const SplashScreen: React.FC = () => {

  const { navigate } = useNavigation();
  const { loginUser } = useAuthentication();

  var fetching = false;

  useEffect(() => {
    // LocaleConfig.defaultLocale = 'en';
    Moment.locale('en');

    loadAutoLoginInformation();

    setTimeout(() => {
      if (fetching == false) {
        navigate('TabBar');
      }
    }, LOADING_TIME);
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
    fetching = true;

    loginUser(emailAddress, passwordString)
    .then(async (result: Promise<ILoginUser>) => {
      goMainScreen();
    }).catch(() => {
      goMainScreen();
    });
  }, []);

  const onAutoLoginBySocial = useCallback(async (loginType: string, accessToken: string, code: string): Promise<void> => {
    fetching = true;

    goMainScreen();
  }, []);

  function goMainScreen() {
    setTimeout(() => {
      navigate('TabBar');
    }, LOADING_TIME);
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
