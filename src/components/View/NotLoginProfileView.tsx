import * as React from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes, User } from '@react-native-community/google-signin';
import { appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { v4 as uuid } from 'uuid'
import PageControl from 'react-native-page-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

// from app
import {
  COLOR, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  GOOGLE_LOGIN, 
  LOGIN_TYPE, 
  MARGIN_TOP,
  viewportWidth, 
} from '../../constants';
import { ColorButton } from '../Button';
import { ContinueText } from '../Text';
import { ILoginUser, ITutorial, IUser } from '../../interfaces/app';
import { useAuthentication, useTutorials } from '../../hooks';
import { IApiError } from '../../interfaces/api';
import { useGlobalState } from '../../redux/Store';


export const NotLoginProfileView: React.FC = () => {

  const profile: IUser = useGlobalState('userInfo');
  const { navigate } = useNavigation();
  const { tutorialList } = useTutorials();
  const { loginByGoogle } = useAuthentication();
  const [profileHelpList, setProfileHelpList] = useState<ITutorial[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  let tutorialIndex = 0;

  useEffect(() => {
    loadProfileList();
  }, []);

  useEffect(() => {
    updateTutorialImage();
  }, [profileHelpList]);

  useEffect(() => {
    if (profile.randomString != '') {
      BackgroundTimer.stopBackgroundTimer();
    } else {
      updateTutorialImage();
    }
  }, [profile])

  const loadProfileList = async () => {
    await tutorialList()
    .then(async (result: Promise<ITutorial[]>) => {
      setProfileHelpList(await result);      
    });
  }

  const updateTutorialImage = () => {
    BackgroundTimer.stopBackgroundTimer();
    if (profileHelpList.length == 0) {
      return;
    }

    BackgroundTimer.runBackgroundTimer(() => { 
      tutorialIndex += 1;
      if (tutorialIndex >= profileHelpList.length) {
        tutorialIndex = 0;
      }
      setCurrentPage(tutorialIndex);
    }, 3000);
  }

  return (
    <View style={{flex: 1}}>
      <CustomText style={styles.title}>Your Profile</CustomText>

      <View style={styles.top_description}>
        <ContinueText colorTexts={[
          { title: 'Create your ', color: COLOR.systemWhiteColor, fontFamily: FONT.AN_Regular, fontSize: 14 },
          { title: 'KloutKast ', color: COLOR.systemRedColor, fontFamily: FONT.AN_Regular, fontSize: 14 },
          { title: 'account to get started.', color: COLOR.systemWhiteColor, fontFamily: FONT.AN_Regular, fontSize: 14 }
        ]} />
      </View>

      <View style={styles.auth_container}>
        <TouchableWithoutFeedback onPress={() => navigate('SignUp') }>
          <CustomText style={{...styles.auth_text, textDecorationLine: 'underline'}}>Sign up with email</CustomText>
        </TouchableWithoutFeedback>

        <CustomText style={styles.auth_text}>  •  </CustomText>

        <TouchableWithoutFeedback onPress={() => navigate('LogIn') }>
          <CustomText style={{...styles.auth_text, textDecorationLine: 'underline'}}>Log in</CustomText>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.info_container}>
        <FlatList
          ref={ref => {
            if (ref != null) {
              ref.scrollToOffset({animated: true, offset: (viewportWidth - 48) * currentPage});
            }
          }}
          // scrollEnabled={false}
          style={styles.profile_help_container}
          contentContainerStyle={{paddingHorizontal: 0}}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          bounces={false}
          horizontal={true}
          data={profileHelpList}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={({nativeEvent}) => { 
            // setCurrentPage(Math.round(nativeEvent.contentOffset.x / viewportWidth));
          }}
          renderItem={({item}) => renderFlatItemView(item)}
        />

        {
          profileHelpList.length > 0
          ? <View style={{...styles.profile_help_description_container, bottom: 80}}>  
              <PageControl
                style={{...styles.page_control, bottom: 24}}
                numberOfPages={profileHelpList.length}
                currentPage={currentPage}
                hidesForSinglePage
                pageIndicatorTintColor='gray'
                currentPageIndicatorTintColor='white'
                indicatorStyle={{borderRadius: 5}}
                currentIndicatorStyle={{borderRadius: 5}}
                indicatorSize={{width:8, height:8}}
                onPageIndicatorPress={(page) => {}}
              />
            </View>
          : null
        }
        
        <View style={styles.social_container}>
          {/* <TouchableWithoutFeedback onPress={() => onConnectWithFacebook()}>
            <View style={{ ...styles.social_button, marginTop: 24 }}>
              <ColorButton title={'Connect With Facebook'} backgroundColor={COLOR.blueColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback> */}

          <TouchableWithoutFeedback onPress={() => onConnectWithGoogle()}>
            <View style={styles.social_button}>
              <ColorButton title={'Connect With Google'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>

          {/* { (Platform.OS == 'ios' || appleAuthAndroid.isSupported) && (
            <TouchableWithoutFeedback onPress={() => onSignUpWithApple()}>
              <View style={styles.social_button}>
                <ColorButton title={'Sign Up With Apple'} backgroundColor={COLOR.systemBlackColor} color={COLOR.systemWhiteColor} />
              </View>
            </TouchableWithoutFeedback>
          )} */}

        </View>
      </View>
    </View>
  );
  
  function onConnectWithFacebook() {
  }

  async function onConnectWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn()
      .then((data) => {
        const currentUser = GoogleSignin.getTokens()
        .then((res) => {
          loginByGoogle(res.accessToken)
          .then(async (result: Promise<ILoginUser>) => {
            await AsyncStorage.setItem(LOGIN_TYPE, GOOGLE_LOGIN);
          }).catch(async (error: Promise<IApiError>) => {
            Alert.alert('', (await error).error.message);
          }).catch(() => {
            Alert.alert('', ERROR_MESSAGE.LOGIN_FAIL);
          });
        })
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  }

  async function onSignUpWithApple() {
    if (Platform.OS == 'ios') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
  
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      if (credentialState === appleAuth.State.AUTHORIZED) {        
      }
    } else {
      const rawNonce = uuid();
      const state = uuid();
  
      appleAuthAndroid.configure({
        clientId: '620619163089-c5qvumalbru6ovtdbr567kqs8hp9p69d.apps.googleusercontent.com',
        redirectUri: 'https://example.com/auth/callback',
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });
  
      const response = await appleAuthAndroid.signIn();
    }
  }

  function renderFlatItemView(item: ITutorial) {
    return <View>
      <Image style={styles.profile_help_image} source={{uri: item.image}} />

      <View style={styles.profile_help_description_container}>
        <CustomText style={styles.profile_help_description}>{item.title}</CustomText>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: MARGIN_TOP, 
    marginLeft: 24, 
    marginRight: 24, 
    backgroundColor: COLOR.clearColor, 
    height: 33, 
    lineHeight: 33,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600', 
    fontSize: 24, 
    color: COLOR.systemWhiteColor,
  },
  top_description: {
    marginTop: 15,
    marginLeft: 24,
    height: 25,
  },
  auth_container: {
    marginTop: 8,
    marginLeft: 24,
    height: 25,
    flexDirection: 'row',
  },
  auth_text: {
    fontFamily: FONT.AN_Regular,
    color: COLOR.alphaWhiteColor50,
    fontSize: 14,
  },
  info_container: {
    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 22,
    borderRadius: 22,
    flex: 1,
  },
  profile_help_container: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginBottom: 80, //212,
    flex: 1,
    overflow: 'hidden',
  },
  profile_help_image: {
    width: viewportWidth - 48,
    height: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  profile_help_description_container: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
    backgroundColor: COLOR.alphaBlackColor20,
  },
  profile_help_description: {
    fontFamily: FONT.AN_Regular,
    color: COLOR.systemWhiteColor,
    fontSize: 14,
    marginTop: 23,
    marginLeft: 24,
    height: 14,
    lineHeight: 14,
  },
  page_control: {
    position:'absolute', 
    right: 24,
    bottom: 236,
    height: 12,
  },
  social_container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 80, //212,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    backgroundColor: COLOR.whiteColor,
    flex: 1,
  },
  social_button: {
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
    height: 44,
  },
});
