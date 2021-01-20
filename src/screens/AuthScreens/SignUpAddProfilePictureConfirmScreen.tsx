import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Container } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase';

// from app
import { 
  COLOR, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  Icon_Back, 
  Img_Edit_Profile_Background, 
  MARGIN_TOP,
  UploadImageToFirebase,
  viewportWidth, 
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { IFile, IUser } from '../../interfaces/app';
import { useAuthentication, useUsers } from '../../hooks';
import { useGlobalState } from '../../redux/Store';


export const SignUpAddProfilePictureConfirmScreen: React.FC = ({route}) => {

  const { reset, goBack } = useNavigation();
  const { updateUserInformation } = useUsers();
  const { setLoginUser } = useAuthentication();

  const profile_icon: IFile = route.params.profile_icon;
  const userInfo: IUser = useGlobalState('userInfo');

  const [uploading, setUploading] = useState(false);

  const onContinue = async () => {
    const filename = userInfo.id;
    const uploadUri = profile_icon.uri;

    const response = await fetch(uploadUri);
    const blob = await response.blob();

    const uploadTask = firebase.storage().ref(`images/${filename}.jpg`).put(blob);
    try {
      await uploadTask;
      firebase.storage()
        .ref('images')
        .child(`${filename}.jpg`)
        .getDownloadURL()
        .then((url) => {
          updateUserInformation(userInfo.id, userInfo.email, userInfo.fullname, '', '', '', '', url, false)
          .then(async (result: Promise<IUser>) => {
            setUploading(false);
            setLoginUser(await result);
            reset({
              index: 0,
              routes: [{ name: 'TabBar' }],
            });
          }).catch(() => {
            setUploading(false);
            Alert.alert(ERROR_MESSAGE.UPDATE_USER_PROFILE_FAIL);
          });
        });
    } catch (e) {
      setUploading(false);
      Alert.alert(ERROR_MESSAGE.UPDATE_USER_PROFILE_FAIL);
    }
  }

  return (
    <Container style={styles.background}>
      
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Edit_Profile_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Confirm Picture</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <CustomText style={styles.description_text}>If you need to make a change,</CustomText>
        <CustomText style={{...styles.description_text, marginTop: 0 }}>tap your profile picture below.</CustomText>

        <View style={styles.container}>
          <View style={styles.profile_container}>
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Image style={styles.profile} source={{uri: profile_icon.uri}} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.bottom_container}>
          <TouchableWithoutFeedback onPress={() => onContinue() }>
            <View style={{ ...styles.bottom_button, marginTop: 0 }}>
              <ColorButton title={'Continue'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>

      <Spinner
        visible={uploading}
        textContent={''}
        textStyle={{color: COLOR.systemWhiteColor}}
      />
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
    fontFamily: FONT.AN_Regular,
    fontWeight: '600' ,
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
  description_text: {
    marginTop: 33,
    marginLeft: 24,
    marginRight: 24,
    height: 23,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.systemWhiteColor,
  },
  container: {
    marginTop: 0,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 150,
  },
  profile_container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile_icon: {
    width: 46,
    height: 58,
  },
  bottom_container: {
    position: 'absolute',
    width: '100%',
    height: 134,
    flex: 1,
    bottom: 33,
    flexDirection: 'row',
  },
  bottom_button: {
    position: 'absolute',
    bottom: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
});
