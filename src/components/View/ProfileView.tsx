import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import PageControl from 'react-native-page-control';
import { useNavigation } from '@react-navigation/native';

// from app
import { 
  COLOR, 
  FONT, 
  Img_Experience_2, 
  MARGIN_TOP, 
} from '../../constants';
import { ColorButton } from '../Button';
import { ContinueText } from '../Text';
import { IProfileHelp } from '../../interfaces/app';
import { useProfileHelps } from '../../hooks';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const ProfileView: React.FC = () => {

  const { navigate } = useNavigation();
  const { profileHelps } = useProfileHelps();

  const [profileHelpList, setProfileHelpList] = useState<IProfileHelp[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  var scrollViewRef: FlatList<IProfileHelp> | null;

  useEffect(() => {
    loadProfileList();
  }, []);

  async function loadProfileList() {
    await profileHelps()
    .then(async (result: Promise<IProfileHelp[]>) => {
      setProfileHelpList(await result);
    });
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Your Profile</Text>

      <View style={styles.top_description}>
        <ContinueText colorTexts={[
          { title: 'Create your ', color: COLOR.systemWhiteColor, fontFamily: FONT.AN_Regular, fontSize: 14 },
          { title: 'KloutKast ', color: COLOR.systemRedColor, fontFamily: FONT.AN_Regular, fontSize: 14 },
          { title: 'account to get started.', color: COLOR.systemWhiteColor, fontFamily: FONT.AN_Regular, fontSize: 14 }
        ]} />
      </View>

      <View style={styles.auth_container}>
        <TouchableWithoutFeedback onPress={() => navigate('SignUp') }>
          <Text style={{...styles.auth_text, textDecorationLine: 'underline'}}>Sign up with email</Text>
        </TouchableWithoutFeedback>

        <Text style={styles.auth_text}>  •  </Text>

        <TouchableWithoutFeedback onPress={() => navigate('LogIn') }>
          <Text style={{...styles.auth_text, textDecorationLine: 'underline'}}>Log in</Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.info_container}>
        <FlatList
            ref={ref => {
              scrollViewRef = ref;
            }}
            style={styles.profile_help_container}
            contentContainerStyle={{paddingHorizontal: 0}}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            bounces={false}
            horizontal={true}
            data={profileHelpList}
            keyExtractor={item => item.id.toString()}
            onMomentumScrollEnd={({nativeEvent}) => { 
              setCurrentPage(Math.round(nativeEvent.contentOffset.x / viewportWidth));
            }}
            renderItem={({item}) => renderFlatItemView(item)}
          />

        {
          profileHelpList.length > 0
          ? <View style={{...styles.profile_help_description_container, bottom: 212}}>  
              <Text style={styles.profile_help_description}>
                {currentPage < profileHelpList.length ? profileHelpList[currentPage].title : ''}
              </Text>

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
                onPageIndicatorPress={(page) => console.log(page)}
              />
            </View>
          : null
        }
        
        <View style={styles.social_container}>
          <TouchableWithoutFeedback onPress={() => onConnectWithFacebook()}>
            <View style={{ ...styles.social_button, marginTop: 24 }}>
              <ColorButton title={'Connect With Facebook'} backgroundColor={COLOR.blueColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onConnectWithGoogle()}>
            <View style={styles.social_button}>
              <ColorButton title={'Connect With Google'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onSignUpWithApple()}>
            <View style={styles.social_button}>
              <ColorButton title={'Sign Up With Apple'} backgroundColor={COLOR.systemBlackColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
  
  function onConnectWithFacebook() {
    console.log('Connect With Facebook');
  }

  function onConnectWithGoogle() {
    console.log('Connect With Google');
  }

  function onSignUpWithApple() {
    console.log('Sign Up With Apple');
  }

  function renderFlatItemView(item: IProfileHelp) {
    return <View>
      {/* <Image style={styles.profile_help_image} source={item.image} /> */}
      {/* // test */}
      <Image style={styles.profile_help_image} source={Img_Experience_2} />

      {/* <View style={styles.profile_help_description_container}>
        <Text style={styles.profile_help_description}>{item.title}</Text>
      </View> */}
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
    fontFamily: FONT.AN_Bold, 
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
    color: COLOR.alphaWhiteColor,
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
    marginBottom: 212,
    flex: 1,
    overflow: 'hidden',
  },
  profile_help_image: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    width: viewportWidth - 48,
    height: '100%',
    resizeMode: 'cover',
    overflow: 'hidden'
  },
  profile_help_description_container: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
    backgroundColor: COLOR.alphaBlackColor,
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
    height: 212,
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
