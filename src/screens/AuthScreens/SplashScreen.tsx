import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { Container } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { GoogleSignin, statusCodes, User } from '@react-native-community/google-signin';
import Moment from 'moment';
import DefaultPreference from 'react-native-default-preference';
import Spinner from 'react-native-loading-spinner-overlay';

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

  const { reset } = useNavigation();
  const { loginUser, loginByGoogle } = useAuthentication();

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  var fetching = false;

  useEffect(() => {
    setFetchingData(true);

    GoogleSignin.configure({
      iosClientId: '620619163089-pm3clc8bqt1i83h2on0f3if7957qhv5t.apps.googleusercontent.com',
      scopes: ['email', 'profile'],
      hostedDomain: '',
      loginHint: '',
      forceCodeForRefreshToken: true,
      accountName: '', 
      webClientId: '620619163089-q7es5q6snv0pq27ljn5kje4uoaha1f9j.apps.googleusercontent.com',
    });

    // LocaleConfig.defaultLocale = 'en';
    Moment.locale('en');

    loadAutoLoginInformation();

    setTimeout(() => {
      if (fetching == false) {
        reset({
          index: 0,
          routes: [{ name: 'TabBar' }],
        });
        setFetchingData(false);
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
      } else if (loginType == GOOGLE_LOGIN) {
        getCurrentGoogleUserInfo();

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

  async function getCurrentGoogleUserInfo() {
    fetching = true;
    try {
      const userInfo = await GoogleSignin.signInSilently()
      .then((data) => {
        const currentUser = GoogleSignin.getTokens()
        .then((res) => {
          loginByGoogle(res.accessToken)
          .then(async (result: Promise<boolean>) => {
            if ((await result) == true) {
              DefaultPreference.set(LOGIN_TYPE, GOOGLE_LOGIN).then(function() { }); 
              DefaultPreference.set(ACCESS_TOKEN, res.accessToken).then(function() { });
              DefaultPreference.set(CODE, res.idToken).then(function() { });
              goMainScreen();
            } else {
              fetching = false;
            }
          }).catch(() => {
            fetching = false;
          });
        })
      });
    } catch (error) {
      fetching = false;
    }
  };

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
      reset({
        index: 0,
        routes: [{ name: 'TabBar' }],
      });
      setFetchingData(false);
    }, LOADING_TIME);
  }

  return (
    <Container style={styles.background}>
      <Image style={styles.background_image} source={Img_Splash_Background} />
      
      <View style={styles.icon} >
        <SvgXml width={75} height={130} xml={Icon_Tab_Bar_Booking_Select} />
      </View>

      {/* <Spinner
        visible={fetchingData}
        textContent={''}
        textStyle={{color: COLOR.systemWhiteColor}}
      /> */}
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
