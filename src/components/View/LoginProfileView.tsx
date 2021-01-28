import * as React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { GoogleSignin } from '@react-native-community/google-signin';
import { appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import DefaultPreference from 'react-native-default-preference';

// from app
import { 
  APPLE_LOGIN,
  COLOR, 
  CustomText, 
  EMAIL_LOGIN, 
  FACEBOOK_LOGIN, 
  FONT, 
  GOOGLE_LOGIN, 
  Icon_Detail_Right_Arrow_White, 
  Icon_Normal_Profile, 
  LOGIN_TYPE, 
  MARGIN_TOP,
  PASSWORD,
  SetApiConfig,
  USER_EMAIL,
  viewportWidth, 
} from '../../constants';
import { ColorButton, TitleArrowButton } from '../Button';
import { IUser } from '../../interfaces/app';
import { useUsers } from '../../hooks';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { ActionType } from '../../redux/Reducer';

export const LoginProfileView: React.FC = () => {
  
  const userInfo: IUser = useGlobalState('userInfo');

  const { navigate, goBack } = useNavigation();
  const { getUserInformation } = useUsers();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [profile, setProfile] = useState<IUser>(userInfo);

  useEffect(() => {
    setProfile(userInfo);
  }, [userInfo]);

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
        bookingInfo: [],
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

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View style={styles.profile_container}>
          <View style={styles.avatar}>
            {
              profile.avatarUrl != ''
              ? <Image style={{...styles.avatar, resizeMode: 'cover'}} source={{uri: profile.avatarUrl}} />
              : <View style={styles.profile_icon}>
                  <View style={{width: 20, height: 25}}>
                    <SvgXml width='100%' height='100%' xml={Icon_Normal_Profile} />
                  </View>
                </View>
            }
          </View>

          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.profile_info}>
              <CustomText style={styles.user_name}>{'Hello, ' + profile.fullname}</CustomText>

              <View style={styles.view_profile_container}>
                <CustomText style={styles.view_profile_title}>View Profile</CustomText>
                <View style={styles.view_profile_arrow}>
                  <SvgXml width='100%' height='100%' xml={Icon_Detail_Right_Arrow_White} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.content_container}>
          <CustomText style={{...styles.content_title, marginTop: 33}}>Account Settings</CustomText>
          <TouchableWithoutFeedback onPress={() => navigate('EditProfile')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Edit Profile'} showArrow={true} white_color={true} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigate('PaymentOptions')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Payment Methods'} showArrow={true} white_color={true} />
            </View>
          </TouchableWithoutFeedback>

          <CustomText style={{...styles.content_title, marginTop: 44}}>Hosting</CustomText>
          { profile.isHost == false
            ? <TouchableWithoutFeedback onPress={() => navigate('BecomeAHost') }>
                <View style={{width:'100%', marginTop: 22}}>
                  <TitleArrowButton title={''} name={'Become a Host'} showArrow={true} white_color={true} />
                </View>
              </TouchableWithoutFeedback>
            : <TouchableWithoutFeedback onPress={() => navigate('HostAnExperience') }>
                <View style={{width:'100%', marginTop: 22}}>
                  <TitleArrowButton title={''} name={'Host An Experience'} showArrow={true} white_color={true} />
                </View>
              </TouchableWithoutFeedback>
          }

          <TouchableWithoutFeedback onPress={() => navigate('ConfirmedBookings')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Confirmed Bookings'} showArrow={true} white_color={true} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigate('Withdrawal')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Withdrawal Options'} showArrow={true} white_color={true} />
            </View>
          </TouchableWithoutFeedback>

          <CustomText style={{...styles.content_title, marginTop: 44}}>Legal</CustomText>
          <TouchableWithoutFeedback onPress={() => onTermsOfService() }>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Terms of Service'} showArrow={true} white_color={true} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onLogOut() }>
            <View style={{width:'100%', marginTop: 22, marginBottom: 20}}>
              <ColorButton title={'Log Out'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
  
  function onTermsOfService() {
  }

  function onLogOut() {
    DefaultPreference.get(LOGIN_TYPE).then(function(loginType) {
      if (loginType == EMAIL_LOGIN) {
      } else if (loginType == FACEBOOK_LOGIN) {
      } else if (loginType == GOOGLE_LOGIN) {
        googleSignOut();
      } else if (loginType == APPLE_LOGIN) {
        appleSignOut();
      } else {
      }
      clearData();
      goBack();
    });
  }

  function clearData() {
    DefaultPreference.set(LOGIN_TYPE, '').then(() => { });
    DefaultPreference.set(USER_EMAIL, '').then(() => { });
    DefaultPreference.set(PASSWORD, '').then(() => { });

    initUserInfo();
  }

  async function googleSignOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  async function appleSignOut() {
    if (Platform.OS == 'ios') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGOUT,
      });
    } else {
      // appleAuthAndroid.configure({
      //   clientId: '620619163089-c5qvumalbru6ovtdbr567kqs8hp9p69d.apps.googleusercontent.com',
      //   redirectUri: 'https://example.com/auth/callback',
      //   responseType: appleAuthAndroid.ResponseType.ALL,
      //   scope: appleAuthAndroid.Scope.ALL,
      //   nonce: rawNonce,
      //   state,
      // });
  
      // const response = await appleAuthAndroid.sigsigIn();
    }
  }
}

const styles = StyleSheet.create({
  profile_container: {
    marginTop: MARGIN_TOP,
    marginLeft: 24,
    marginRight: 24,
    width: viewportWidth - 48,
    height: 66,
    flexDirection: 'row',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile_icon: {
    width: '100%',
    height: '100%',
    borderRadius: 33,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile_info: {
    marginTop: 8,
    marginLeft: 16,
  },
  user_name: {
    height: 24, 
    lineHeight: 24,
    fontFamily: FONT.AN_Regular, 
    fontWeight: '600',
    fontSize: 24, 
    color: COLOR.systemWhiteColor,
  },
  view_profile_container: {
    marginTop: 12,
    height: 14,
    flexDirection: 'row',
  },
  view_profile_title: {
    height: 14, 
    lineHeight: 14,
    fontFamily: FONT.AN_Regular, 
    fontWeight: '600',
    fontSize: 14, 
    color: COLOR.alphaWhiteColor50,
  },
  view_profile_arrow: {
    marginTop: 3,
    marginLeft: 7,
    width: 4,
    height: 8, 
    lineHeight: 14,
  },
  content_container: {
    marginLeft: 24,
    marginRight: 24,
    width: viewportWidth - 48,
  },
  content_title: {
    height: 12, 
    lineHeight: 12,
    fontFamily: FONT.AN_Regular, 
    fontWeight: '600',
    fontSize: 12, 
    color: COLOR.alphaWhiteColor75,
  },
});
