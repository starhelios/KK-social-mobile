import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Container } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import ImagePicker from 'react-native-image-crop-picker';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Normal_Profile, 
  Img_Edit_Profile_Background, 
  MARGIN_TOP,
  viewportWidth, 
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { IFile } from '../../interfaces/app';


export const SignUpAddProfilePictureScreen: React.FC = () => {

  const { navigate, reset } = useNavigation();

  const onSkip = () => {
    reset({
      index: 0,
      routes: [{ name: 'TabBar' }],
    });
  }

  const onChoosePhoto = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: false,
      cropping: true,
      mediaType: "photo",
    })
    .then((image) => {
      const file = {
        name: 'avatar.jpg',
        type: image.mime,
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
      };
      navigate('SignUpAddProfilePictureConfirm', {profile_icon: file});
    })
    .catch((e) => {});
  }

  const onTakePicture = () => {
    ImagePicker.openCamera({
      includeBase64: true,
      multiple: false,
      cropping: true,
      mediaType: "photo",
    })
    .then((image) => {
      const file: IFile = {
        name: 'avatar.jpg',
        type: image.mime,
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
      };
      navigate('SignUpAddProfilePictureConfirm', {profile_icon: file});
    })
    .catch((e) => {
    });
  }

  return (
    <Container style={styles.background}>
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Edit_Profile_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Profile Picture</CustomText>

          <TouchableWithoutFeedback onPress={() => onSkip()}>
            <CustomText style={styles.skip_text}>Skip</CustomText>
          </TouchableWithoutFeedback>
        </View>

        <CustomText style={styles.description_text}>Add a profile picture so hosts</CustomText>
        <CustomText style={{...styles.description_text, marginTop: 0 }}>know who you are.</CustomText>

        <View style={styles.container}>
          <View style={styles.profile_container}>
            <View style={styles.profile}>
              <View style={styles.profile_icon}>
                <SvgXml width='100%' height='100%' xml={Icon_Normal_Profile} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottom_container}>
          <TouchableWithoutFeedback onPress={ onChoosePhoto }>
            <View style={styles.bottom_button}>
              <ColorButton title={'Choose Photo'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={ onTakePicture }>
            <View style={{ ...styles.bottom_button, marginTop: 0 }}>
              <ColorButton title={'Take a Picture'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
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
    fontWeight: '600', 
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
  skip_text: {
    position: 'absolute',
    right: 24,
    width: 40,
    height: 33,
    lineHeight: 33,
    textAlign: 'right',
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    fontWeight: '600',
    color: COLOR.systemWhiteColor,
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
    bottom: 30,
  },
  bottom_button: {
    marginTop: 16,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
});
