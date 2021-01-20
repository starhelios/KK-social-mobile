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
import { GoogleSignin } from '@react-native-community/google-signin';
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
  intialization,
  SetApiConfig,
} from '../../constants';
import { useAuthentication } from '../../hooks';
import { ILoginUser } from '../../interfaces/app';
import { ActionType } from '../../redux/Reducer';
import { useDispatch } from '../../redux/Store';


export const SplashScreen: React.FC = () => {
  
  const dispatch = useDispatch();
  const { reset } = useNavigation();
  const { loginUser, loginByGoogle } = useAuthentication();

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  var fetching = false;

  useEffect(() => {
    initUserInfo();
    setFetchingData(true);

    intialization();

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

  const initUserInfo = () => {
    dispatch({
      type: ActionType.SET_USER_INFO,
      payload: {
        id: '',
        fullname: '',
        isHost: false,
        email: '',
        status: '',
        avatarUrl: '',
        dateOfBirth: '', 
        aboutMe: '',
        location: '',
        categoryName: '',
        createdAt: '',
  
        paymentInfo: [],
        bankInfo: [],
      },
    });
  
    dispatch({
      type: ActionType.SET_ACCESS_TOKEN,
      payload: {
        token: '',
        expires: '', 
      },
    });
    SetApiConfig('');
  
    dispatch({
      type: ActionType.SET_ACCESS_TOKEN,
      payload: {
        token: '',
        expires: '', 
      },
    });
  }

  const loadAutoLoginInformation = () => {
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

      } else if (loginType == FACEBOOK_LOGIN) {

      } else if (loginType == APPLE_LOGIN) {

      }
    });
  }

  const getCurrentGoogleUserInfo = async () => {
    fetching = true;
    try {
      const userInfo = await GoogleSignin.signInSilently()
      .then((data) => {
        const currentUser = GoogleSignin.getTokens()
        .then((res) => {
          loginByGoogle(res.accessToken)
          .then(async (result: Promise<boolean>) => {
            if ((await result) == true) {
              goMainScreen();
            } else {
              fetching = false;
            }
          }).catch(() => {
            goMainScreen();
            fetching = false;
          });
        }).catch(() => {
          goMainScreen();
          fetching = false;
        });
      }).catch(() => {
        goMainScreen();
        fetching = false;
      });
    } catch (error) {
      goMainScreen();
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

  const goMainScreen = () => {
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
