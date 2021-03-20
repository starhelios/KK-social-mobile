import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  Icon_Back, 
  Img_Auth_Background,
  MARGIN_TOP,
  viewportWidth,
} from '../../constants';
import { IExperience } from '../../interfaces/app';
import { useGlobalState } from '../../redux/Store';
import { ExperienceView } from '../../components/View';
import { ColorButton } from '../../components/Button';


export const ExperiencesHostedByMeScreen: React.FC = () => {

  const experienceList = useGlobalState('experienceList');
  const userInfo = useGlobalState('userInfo');
  const { navigate, goBack } = useNavigation();
  const [ myExperienceList, setMyExperienceList ] = useState<IExperience[]>([]);
  const [ fetchingData, setFetchingData ] = useState<boolean>(false);

  useEffect(() => {
    getMyExperienceList();
  }, [experienceList])

  const getMyExperienceList = () => {
    var myExperiences = [];
    for (let experience of experienceList) {
      if (experience.userId == userInfo.randomString) {
        myExperiences.push(experience);
      }
    }
    setMyExperienceList(myExperiences);
  }

  return (
    <Container style={styles.background}>
      <View style={{width: '100%', height: '100%', flex: 1}}>
        <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Auth_Background} />
        <SafeAreaView style={styles.safe_area}>
          <View style={styles.navigation_bar}>
            <CustomText style={styles.title}>Hosted Experiences</CustomText>
  
            <TouchableWithoutFeedback onPress={() => goBack() }>
              <View style={styles.back_icon}>
                <SvgXml width='100%' height='100%' xml={Icon_Back} />
              </View>
            </TouchableWithoutFeedback>
          </View>
  
          <FlatList
            style={{width: '100%', flex: 1, marginTop: 22, marginBottom: 30 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            numColumns={2}
            data={myExperienceList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ExperienceView experience={item} white_color={true} onFetchingData={setFetchingData} viewWidth={(viewportWidth - 64) / 2} is_edit={true} />}
          />

          <TouchableWithoutFeedback onPress={() => {
            userInfo.zoomConnected != true
              ? Alert.alert('', ERROR_MESSAGE.NONE_CONNECT_ZOOM_ACCOUNT)
              : navigate('HostAnExperience')
          }}>
            <View style={styles.saveButton}>
              <ColorButton title={'Host an Experience'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
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
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  input_container: {
    marginLeft: 24, 
    marginRight: 24, 
    marginTop: 35, 
    flexDirection: 'column',
    flex: 1,
  },
  info_title: {
    width: '100%',
    height: 23,
    lineHeight: 23,
    fontWeight: '600',
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    color: COLOR.alphaWhiteColor75,
  },
  saveButton: {
    // position: 'absolute',
    bottom: 22,
    marginLeft: 24,
    marginRight: 24,
    // marginTop: 150,
    width: viewportWidth - 48,
    height: 44,
  },
});
