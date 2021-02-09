import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import ImagePicker from 'react-native-image-crop-picker';
import Autocomplete from 'react-native-autocomplete-input';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase';

// from app
import { 
  COLOR, 
  CustomText, 
  CustomTextInput, 
  ERROR_MESSAGE, 
  FONT, 
  generateName, 
  Icon_Back_Black,
  Icon_Search_Black,
  MARGIN_TOP,
  SUCCESS_MESSAGE,
  viewportWidth,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { ICategory, IDateAvailabilityInfo, IExperience, IUser } from '../../interfaces/app';
import { ExperienceImageView } from '../../components/View';
import { useExperiences } from '../../hooks';
import { ActionType } from '../../redux/Reducer';
import GlobalStyle from '../../styles/global';


export const HostAnExperienceScreen: React.FC = () => {

  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const { createExperience } = useExperiences();

  const [imageList, setImageList] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  const [changeCount, setChangeCount] = useState<number>(0);
  const [dateAvaibilityInfo, setDateAvaibilityInfo] = useState<IDateAvailabilityInfo>({startDay: '', endDay: '', dateAvaibility: []});
  const [uploading, setUploading] = useState(false);
  
  const profile: IUser = useGlobalState('userInfo');
  const allCategoryList: ICategory[] = useGlobalState('categoryList');

  const comp = (a: string, b: string) => a.toLowerCase().trim() === b.toLowerCase().trim();
  const findCategory = (query: string) => {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query}`, 'i');
    return allCategoryList.filter(category => category.name.search(regex) >= 0);
  }
  var fetchingData = false;

  useEffect(() => {
    var images: string[] = [];
    images.push('');
    images.push('');
    images.push('');
    images.push('');
    images.push('');
    setImageList(images);
  }, []);

  const onSelectPhoto = (index: number) => {
    if (index > imageCount) {
      return;
    }
    onChoosePhoto(index);
  }

  const onCreateExperience = () => {
    if (fetchingData == true) {
      return;
    } else if (imageCount == 0) {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EXPERIENCE_IMAGE);
      return;
    } else if (title == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EXPERIENCE_TITLE);
      return;
    } else if (description == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EXPERIENCE_DESCRIPTION);
      return;
    } else if (category == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EXPERIENCE_CATEGORY);
      return;
    } else if (duration == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EXPERIENCE_DURRATION);
      return;
    } else if (price == '' || parseInt(price) == 0) {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EXPERIENCE_PRICE);
      return;
    } else if (dateAvaibilityInfo.startDay == '' || dateAvaibilityInfo.endDay == '') {
      Alert.alert('', ERROR_MESSAGE.EMPTY_EXPERIENCE_AVAILABILITY_DATES);
      return;
    }

    fetchingData = true;
    setUploading(true);
    uploadExperienceImage([], 0);
  }

  const uploadExperienceImage = async (experienceImageList: string[], imageIndex: number) => {
    const firebaseHeader = 'https://firebasestorage.googleapis.com/';
    if (imageIndex >= imageList.length) {
      createExperience(title, description, parseInt(duration), parseInt(price), category, dateAvaibilityInfo.startDay, dateAvaibilityInfo.endDay, 
            profile.id, experienceImageList, dateAvaibilityInfo.dateAvaibility, profile.location)
      .then(async (result: IExperience) => {
        fetchingData = false;
        setUploading(false);
        dispatch({
          type: ActionType.SET_NEED_RELOAD_DATA,
          payload: true,
        })
        Alert.alert('',
          SUCCESS_MESSAGE.CREATE_EXPERIENCE_SUCCESS,
          [
            { text: "OK", onPress: () => goBack() }
          ],
          { cancelable: false }
        );
      }).catch(() => {
        fetchingData = false;
        setUploading(false);
        Alert.alert('', ERROR_MESSAGE.CREATE_EXPERIENCE_FAIL);
      })
      return;
    }

    const imageUrl = imageList[imageIndex];

    if (imageUrl == '') {
      uploadExperienceImage(experienceImageList, imageIndex + 1);
    } else if (imageUrl.length > firebaseHeader.length && imageUrl.substring(0, firebaseHeader.length) == firebaseHeader) {
      let images = experienceImageList;
      images.push(imageUrl);
      uploadExperienceImage(images, imageIndex + 1);
    } else {
      const filename = `${generateName()}_${imageIndex}`;
      const uploadUri = imageUrl;

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
            let images = experienceImageList;
            images.push(url);
            uploadExperienceImage(images, imageIndex + 1);
          });
      } catch (e) {
        uploadExperienceImage(experienceImageList, imageIndex + 1);
      }
    }
  }

  function onSelectedPhoto(index: number, file: string) {
    let images: string[] = imageList;
    images[index] = file;
    setImageList(images);

    if (index == imageCount) {
      setImageCount(imageCount + 1);
    }
    setChangeCount(changeCount + 1);
  }

  function onChoosePhoto(index: number) {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: false,
      cropping: false,
      mediaType: "photo",
    })
    .then((image) => {
      onSelectedPhoto(index, Platform.OS === 'android'
        ? image.path
        : image.path.replace('file://', ''));
    })
    .catch((e) => {});
  }

  function onTakePicture(index: number) {
    ImagePicker.openCamera({
      includeBase64: true,
      multiple: false,
      cropping: false,
      mediaType: "photo",
    })
    .then((image) => {
      onSelectedPhoto(index, Platform.OS === 'android'
        ? image.path
        : image.path.replace('file://', ''));
    })
    .catch((e) => {
    });
  }

  return (
    <Container style={{...styles.background, backgroundColor: COLOR.whiteColor}}>
      <SafeAreaView style={styles.safe_area}>
        <View style={{flex: 1}}>
          <View style={styles.navigation_bar}>
            <CustomText style={styles.title}>Host an Experience</CustomText>

            <TouchableWithoutFeedback onPress={() => goBack()}>
              <View style={styles.back_icon}>
                <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{flex: 1}}>
            <View style={styles.container}>
              <KeyboardAwareScrollView 
                style={{width: '100%', height: '100%', flex: 1}} 
                keyboardDismissMode="interactive" 
                keyboardShouldPersistTaps="always"
              >
                <View style={styles.profile_container}>
                  <View style={{width:'100%'}}>
                    <CustomText style={{...styles.info_title, marginLeft: 24}}>Photos</CustomText>
                    <FlatList
                      style={{height: 75, marginTop: 16 }}
                      contentContainerStyle={{paddingHorizontal: 24}}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={imageList}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => <ExperienceImageView image={item} imageCount={imageCount} index={index} onSelectPhoto={onSelectPhoto} changeCount={changeCount} />}
                    />
                  </View>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                  <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48}}>
                    <View style={{width:'100%', zIndex: 100}}>
                      <CustomText style={styles.info_title}>Category</CustomText>
                      <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        inputContainerStyle={styles.autocompleteInput}
                        style={styles.autocomplete}
                        data={categoryList.length === 1 && comp(category, categoryList[0].name) ? [] : categoryList}
                        defaultValue={category}
                        onChangeText={text => {
                          setCategory(text);
                          setCategoryList(findCategory(text));
                        }}
                        placeholder="Search Categories"
                        placeholderTextColor={COLOR.alphaBlackColor75}
                        renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {
                            setCategory(item.name);
                            setCategoryList([]);
                          }}>
                            <CustomText style={styles.autocompleteContent}>
                              {item.name}
                            </CustomText>
                          </TouchableOpacity>
                        )}
                      />
                      <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20}} />

                      <View style={{position: 'absolute', top: 40, left: 0, width: 14, height: 14}}>
                        <SvgXml width='100%' height='100%' xml={Icon_Search_Black} />
                      </View>
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>Title</CustomText>
                      <CustomTextInput
                        style={{...GlobalStyle.auth_input, color: COLOR.systemBlackColor}}
                        placeholder={'Title'}
                        placeholderTextColor={COLOR.alphaBlackColor75}
                        onChangeText={text => setTitle(text)}
                        value={title}
                      />
                      <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20}} />
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>Description</CustomText>
                      <CustomTextInput
                        style={{...GlobalStyle.auth_input, color: COLOR.systemBlackColor}}
                        placeholder={'Description'}
                        placeholderTextColor={COLOR.alphaBlackColor75}
                        onChangeText={text => setDescription(text)}
                        value={description}
                      />
                      <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20}} />
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>Duration (in minutes)</CustomText>
                      
                      <CustomTextInput
                        style={{...GlobalStyle.auth_input, color: COLOR.systemBlackColor}}
                        placeholder={'Duration'}
                        keyboardType={'number-pad'}
                        placeholderTextColor={COLOR.alphaBlackColor75}
                        onChangeText={text => setDuration(text)}
                        value={duration}
                      />
                      <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20}} />
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>Price / Person</CustomText>
                      <View style={{flexDirection: 'row'}}>
                        <CustomText style={styles.price}>$</CustomText>
                        <CustomTextInput
                          style={{...GlobalStyle.auth_input, color: COLOR.systemBlackColor}}
                          keyboardType={'number-pad'}
                          placeholder={'Price'}
                          placeholderTextColor={COLOR.alphaBlackColor75}
                          onChangeText={text => setPrice(text)}
                          value={price}
                        />
                      </View>
                      <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20}} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigate('SelectAvailabilityDates', {dateAvaibilityInfo: dateAvaibilityInfo, setDateAvaibilityInfo: setDateAvaibilityInfo, duration: duration}) }>
                  <View style={{height: 44, marginLeft: 48, marginRight: 48, marginTop: 22}}>
                    <ColorButton title={'Select Dates of Availability'} backgroundColor={COLOR.alphaBlackColor20} color={COLOR.systemBlackColor} />
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={onCreateExperience}>
                  <View style={styles.bottom_button}>
                    <ColorButton title={'Create Experience'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
                  </View>
                </TouchableWithoutFeedback>

              </KeyboardAwareScrollView>   
            </View>
          </View>
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
    fontSize: 14, 
    fontWeight: '600',
    textAlign: 'center',
    color: COLOR.systemBlackColor,
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
    width: '100%', 
    position: 'absolute', 
    top: 0, 
    bottom: 0,
  },
  profile_container: {
    width: '100%',
    height: 150,
    marginTop: 42,
    alignItems: 'center',
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  profile_no_image: {
    width: '100%', 
    height: '100%',
    borderRadius: 75,
    backgroundColor: COLOR.whiteColor, 
    alignItems: 'center', 
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  camera_container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 45,
    alignItems: 'center', 
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  camera_icon: {
    position: 'absolute',
    bottom: 15,
    width: 30,
    height: 25,
  },
  bottom_container: {
    position: 'absolute',
    width: '100%',
    height: 134,
    flex: 1,
    bottom: 0,
    flexDirection: 'row',
  },
  bottom_button: {
    marginTop: 22,
    marginBottom: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
  info_title: {
    width: '100%',
    height: 23,
    lineHeight: 23,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    fontWeight: '600',
    color: COLOR.alphaBlackColor75,
  },
  price: {
    fontFamily: FONT.AN_Regular,
    fontSize: 16, 
    width: 15, 
    height: 20, 
    lineHeight: 20, 
    marginTop: 17, 
    color: COLOR.systemBlackColor,
  },
  autocompleteContainer: {
    zIndex: 100,
    borderColor: COLOR.clearColor,
    borderWidth: 0,
  },
  autocompleteInput: {
    borderColor: COLOR.clearColor,
    borderWidth: 0,
  },
  autocomplete: {
    backgroundColor: COLOR.clearColor,
    borderColor: COLOR.clearColor,
    borderWidth: 0,
    height: 45,
    color: COLOR.systemBlackColor,
    paddingLeft: 25,
  },
  autocompleteContent: {
    height: 35,
    lineHeight: 35,
    fontFamily: FONT.AN_Regular,
    paddingLeft: 20, 
    backgroundColor: COLOR.systemWhiteColor, 
    color: COLOR.systemBlackColor,
  },
});
