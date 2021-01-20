import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import ImagePicker from 'react-native-image-crop-picker';
import Autocomplete from 'react-native-autocomplete-input';

// from app
import { 
  COLOR, 
  CustomText, 
  CustomTextInput, 
  FONT, 
  generateName, 
  Icon_Back_Black,
  Icon_Search_Black,
  MARGIN_TOP,
  viewportWidth,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useGlobalState } from '../../redux/Store';
import { ICategory, IFile, IUser } from '../../interfaces/app';
import { ExperienceImageView } from '../../components/View';
import GlobalStyle from '../../styles/global';


export const HostAnExperienceScreen: React.FC = () => {

  const { goBack } = useNavigation();

  const [imageList, setImageList] = useState<IFile[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [price, setPrice] = useState<string>('0');
  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);

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

  useEffect(() => {
    var images: IFile[] = [];
    images.push({name: '', type: '', uri: ''});
    images.push({name: '', type: '', uri: ''});
    images.push({name: '', type: '', uri: ''});
    images.push({name: '', type: '', uri: ''});
    images.push({name: '', type: '', uri: ''});
    setImageList(images);
  }, []);

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
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
              <ScrollView style={{}}>
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
                      renderItem={({item}) => 
                      <View>
                        <TouchableWithoutFeedback onPress={() => onSelectPhoto(0) }>
                          <ExperienceImageView image={item} showPlusIcon={true} />
                        </TouchableWithoutFeedback>
                        </View>
                      }
                    />
                  </View>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                  <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48, marginBottom: 22}}>
                    <View style={{width:'100%'}}>
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

                    <View style={{width:'100%', marginTop: 22, zIndex: 100}}>
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
                        keyboardType={'numeric'}
                        placeholder={'Duration'}
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
                          keyboardType={'numeric'}
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
              </ScrollView>
            </KeyboardAvoidingView>   
          </View>

          <TouchableWithoutFeedback onPress={() => onCreateExperience() }>
            <View style={styles.bottom_button}>
              <ColorButton title={'Create Experience'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>

        </View>
        </View>
      </SafeAreaView>
    </Container>
  );

  function onSelectPhoto(index: number) {
    console.log('asd');
    onChoosePhoto(index);
  }

  function onSelectedPhoto(index: number, file: IFile) {
    let images: IFile[] = imageList;
    images[index] = file;
    setImageList(images);
  }

  function onChoosePhoto(index: number) {
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
      onSelectedPhoto(index, file);
    })
    .catch((e) => {});
  }

  function onTakePicture(index: number) {
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
      onSelectedPhoto(index, file);
    })
    .catch((e) => {
    });
  }

  function onCreateExperience() {

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
    bottom: 66,
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
    position: 'absolute',
    bottom: 20,
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
