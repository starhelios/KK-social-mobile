import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import ImagePicker from 'react-native-image-crop-picker';

// from app
import { 
  COLOR, 
  FONT, 
  Icon_Back,
  Icon_Normal_Profile,
  Img_Edit_Profile_Background,
  MARGIN_TOP,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { IFile } from 'src/interfaces/app';

const { width: viewportWidth } = Dimensions.get('window');

export const SignUpAddProfilePictureScreen: React.FC = () => {

  const { navigate, goBack } = useNavigation();

  useEffect(() => {
  }, [])

  return (
    <View style={styles.background}>
      
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Edit_Profile_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Profile Picture</Text>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onSkip()}>
            <View style={styles.skip}>
              <Text style={styles.skip_text}>Skip</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.description_text}>Add a profile picture so hosts</Text>
        <Text style={{...styles.description_text, marginTop: 0 }}>know who you are.</Text>

        <View style={styles.container}>
          <View style={styles.profile_container}>
            <View style={styles.profile}>
              <View style={styles.profile_icon}>
                <SvgXml width='100%' height='100%' xml={Icon_Normal_Profile} />
              </View>
            </View>
          </View>

          <View style={styles.bottom_container}>
            <TouchableWithoutFeedback onPress={() => onChoosePhoto() }>
              <View style={styles.bottom_button}>
                <ColorButton title={'Choose Photo'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => onTakePicture() }>
              <View style={{ ...styles.bottom_button, marginTop: 0 }}>
                <ColorButton title={'Take a Picture'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          
        </View>
      </SafeAreaView>
    </View>
  );

  function onSkip() {
    console.log('skip profile image');
    navigate('TabBar');
  }

  function onChoosePhoto() {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: false,
      cropping: true,
      mediaType: "photo",
    })
    .then((image) => {
      let fileName = generateName();
      const file = {
        name: 'image' + fileName + '.jpg',
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

  function onTakePicture() {
    ImagePicker.openCamera({
      includeBase64: true,
      multiple: false,
      cropping: true,
      mediaType: "photo",
    })
    .then((image) => {
      let fileName = generateName();
      const file: IFile = {
        name: 'image' + fileName + '.jpg',
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

  function generateName() {
    return (
      Math.random().toString(36).substring(2, 10) +
      '-' +
      Math.random().toString(36).substring(2, 6)
    );
  }
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
    fontFamily: FONT.AN_Bold, 
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
  skip: {
    position: 'absolute',
    right: 24,
    width: 25,
    height: '100%',
    alignItems: 'center',
  },
  skip_text: {
    width: '100%',
    height: 18,
    lineHeight: 18,
    textAlign: 'right',
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
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
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  profile_container: {
    width: '100%',
    height: '100%',
    bottom: 134,
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
    bottom: 0,
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
