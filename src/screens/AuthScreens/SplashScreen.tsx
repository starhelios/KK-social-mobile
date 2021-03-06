import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

// from app
import { 
  COLOR,
  LOADING_TIME,
  Img_Splash_Background, 
  Icon_Tab_Bar_Booking_Select,
  LOGIN_TYPE,
  EMAIL_LOGIN,
  USER_EMAIL,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  APPLE_LOGIN,
  intialization,
  SetApiConfig,
  PASSWORD,
} from '../../constants';
import { useAuthentication, useUsers } from '../../hooks';
import { ILoginUser, IUser } from '../../interfaces/app';
import { ActionType } from '../../redux/Reducer';
import { useDispatch } from '../../redux/Store';


export const SplashScreen: React.FC = () => {
  
  const dispatch = useDispatch();
  const { reset } = useNavigation();
  const { loginUser, loginByGoogle, setLoginUser } = useAuthentication();
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  let fetching = false;

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
        stripeCustomerID: '',
        stripeConnectID: '',
        zoomAccessToken: '',
        zoomRefreshToken: '',
        zoomId: '',
        experiences: [],
        availableMethods: [],
        randomString: '',
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
    AsyncStorage.getItem(LOGIN_TYPE).then((loginType) => {
      if (loginType == EMAIL_LOGIN) {
        AsyncStorage.getItem(USER_EMAIL).then((emailAddress) => {
          if (emailAddress != null && emailAddress != '') {
            AsyncStorage.getItem(PASSWORD).then((passwordString) => {
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
          .then(async (result: Promise<ILoginUser>) => {
            goMainScreen();
          }).catch(() => {
            goMainScreen();
          });
        }).catch(() => {
          goMainScreen();
        });
      }).catch(() => {
        goMainScreen();
      });
    } catch (error) {
      goMainScreen();
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
