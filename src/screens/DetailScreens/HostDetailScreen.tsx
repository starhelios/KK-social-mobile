import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  convertStringToDateFormat, 
  CustomText, 
  FONT, 
  Icon_Back_Black,
  Icon_Location_Black,
  Icon_Rating_Black,
  Img_User_Avatar,
  MARGIN_TOP,
  viewportWidth,
} from '../../constants';
import { IExperience, IUser, IHostDetail } from '../../interfaces/app';
import { ExperienceView } from '../../components/View';
import { useExperiences } from '../../hooks';
import { useGlobalState } from '../../redux/Store';
import GlobalStyle from '../../styles/global';
import Spinner from 'react-native-loading-spinner-overlay';


export const HostDetailScreen: React.FC = ({route}) => {

  const experienceList = useGlobalState('experienceList');

  const { navigate, goBack } = useNavigation();
  const { getExperienceList } = useExperiences();

  const hostDetail: IHostDetail = route.params.hostDetail;
  const host: IUser = hostDetail.user;

  const [hostExperienceList, setHostExperienceList] = useState<IExperience[]>([]);
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    loadExperienceList();
  }, [])

  async function loadExperienceList() {
    // await getExperienceList()
    // .then(async (result: Promise<IExperience[]>) => {
    //   setExperienceList(await result);
    // }).catch(() => {
    // });

    let experiences: IExperience[] = [];
    for (let i = 0; i < experienceList.length; i++) {
      let experience = experienceList[i];
      if (experience.userId == host.randomString) {
        experiences.push(experience);
      }
    }
    setHostExperienceList(experiences);
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>

        <View style={styles.navigation_bar}>
          <CustomText style={styles.navigation_title}>{'Say Hello! to ' + host.fullname}</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView 
          style={{width: '100%', height: '100%', flex: 1}} 
          bounces={false} 
          showsVerticalScrollIndicator={false}>

          <View style={styles.container}>
            <View style={{marginTop: 33, flexDirection: 'row'}}>
              <View style={{width: viewportWidth - 100}}>
                <CustomText style={styles.host_name}>{'Hey, I\'m ' + host.fullname}</CustomText>
                <CustomText style={styles.joined_date}>{'Joined in ' + convertStringToDateFormat(host.createdAt, 'MMMM D, YYYY')}</CustomText>
              </View>
              <Image
                style={styles.avatar}
                source={(host.avatarUrl == null || host.avatarUrl == '') ? Img_User_Avatar : {uri: host.avatarUrl}} />
            </View>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <CustomText style={{...styles.content_title, marginTop: 22}}>{'About this host'}</CustomText>
            <View style={{marginTop: 22, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Location_Black} />
              <CustomText style={{...styles.location, marginTop: 1, marginLeft: 8}}>{host.location}</CustomText>
            </View>

            <View style={{marginTop: 12, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Rating_Black} />
              <CustomText style={{...styles.location, marginTop: 1, marginLeft: 8}}>{hostDetail.ratingMark + ' Stars • ' + hostDetail.ratingCount + ' Ratings'}</CustomText>
            </View>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <CustomText style={styles.description}>{host.aboutMe}</CustomText>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <CustomText style={{...styles.content_title, marginTop: 22}}>{host.fullname + '\'s Experiences'}</CustomText>
          </View>

          <FlatList
            style={{width: '100%', height: 284, marginTop: 22 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={hostExperienceList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ExperienceView experience={item} white_color={false} onFetchingData={setFetchingData} viewWidth={154} is_edit={false} />}
          />
        </ScrollView>
      </SafeAreaView>

      <Spinner
        visible={fetchingData}
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
    backgroundColor: COLOR.whiteColor, 
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
    height: 24,
    flexDirection: 'row',
  },
  navigation_title: {
    marginTop: 3,
    lineHeight: 14,
    height: 14,
    marginLeft: 55,
    width: viewportWidth - 110,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 14,
    color: COLOR.blackColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  container: {
    marginLeft: 24,
    marginRight: 24,
  },
  host_name: {
    height: 24,
    lineHeight: 24,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 24,
    color: COLOR.blackColor,
  },
  joined_date: {
    marginTop: 12,
    height: 14,
    lineHeight: 14,
    //fontWeight: '500',
    color: COLOR.alphaBlackColor75,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
  avatar: {
    position: 'absolute',
    right: 0,
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 30,
    overflow: 'hidden',
  },
  content_title: {
    height: 20,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 20,
    color: COLOR.blackColor,
  },
  description: {
    marginTop: 22,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    //fontWeight: '500',
    fontSize: 14,
    color: COLOR.blackColor,
  },
  location: {
    marginTop: 12,
    lineHeight: 14,
    fontFamily: FONT.AN_Regular,
    //fontWeight: '500',
    fontSize: 14,
    color: COLOR.alphaBlackColor75,
  },
});
