import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import PageControl from 'react-native-page-control';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  GetDurationString, 
  Icon_Back,
  Icon_Experience_Black,
  Icon_Share_White,
  Icon_Time_Black,
  Img_Edit_Profile_Background,
  MARGIN_TOP,
  viewportWidth,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { IExperience } from '../../interfaces/app';
import GlobalStyle from '../../styles/global';


export const ExperienceDetailHostScreen: React.FC = ({route}) => {

  const { navigate, goBack } = useNavigation();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const experience: IExperience = route.params.experience;
  let scrollViewRef: FlatList<string> | null;

  useEffect(() => {
  }, [])

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <ScrollView 
          style={{position: 'absolute', width: '100%', height: '100%', bottom: 110, flex: 1}} 
          bounces={false} 
          showsVerticalScrollIndicator={false}>

          <View style={styles.image_container}>
            <FlatList
              ref={ref => {
                scrollViewRef = ref;
              }}
              style={{width: '100%', height: '100%'}}
              contentContainerStyle={{paddingHorizontal: 0}}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              bounces={false}
              horizontal={true}
              data={experience.images}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={({nativeEvent}) => { 
                setCurrentPage(Math.round(nativeEvent.contentOffset.x / viewportWidth));
              }}
              renderItem={({item}) => <Image style={styles.image} source={Img_Experience_2} />}
            />

            <View style={styles.page_control_container}>  
              <PageControl
                style={styles.page_control}
                numberOfPages={experience.images.length}
                currentPage={currentPage}
                hidesForSinglePage
                pageIndicatorTintColor='gray'
                currentPageIndicatorTintColor='white'
                indicatorStyle={{borderRadius: 6}}
                currentIndicatorStyle={{borderRadius: 6}}
                indicatorSize={{width:6, height:6}}
                onPageIndicatorPress={(page) => {}}
              />
            </View>
          </View>

          <View style={styles.content_container}>
            <CustomText style={styles.title}>{experience.title}</CustomText>
            <CustomText style={styles.location}>{experience.location}</CustomText>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />
            
            <View style={{marginTop: 12, flexDirection: 'row'}}>
              <CustomText style={styles.host_name}>{'Hosted by ' + experience.host.username}</CustomText>
              <Image style={styles.avatar} source={Img_Avatar_1} />
            </View>

            <View style={{marginTop: 12, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Time_Black} />
              <CustomText style={{...styles.location, marginTop: 1, marginLeft: 8}}>{GetDurationString(experience.duration)}</CustomText>
            </View>

            <View style={{marginTop: 12, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Experience_Black} />
              <CustomText style={{...styles.location, marginTop: 1, marginLeft: 8}}>{experience.title}</CustomText>
            </View>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <CustomText style={{...styles.host_name, marginTop: 22}}>About the experience</CustomText>
            <CustomText style={styles.about}>{experience.description}</CustomText>            
          </View>
        </ScrollView>

        <LinearGradient
          colors={['#00000010', '#00000020']}
          style={styles.gradient_container}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}} >
        </LinearGradient>

        <View style={styles.navigation_bar}>
          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onShare()}>
            <View style={styles.share_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Share_White} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.bottom_container}>
          <View style={styles.price_container}>
            <CustomText style={styles.price}>{'From $' + experience.min_price}</CustomText>
            <CustomText style={styles.personal}>{' / ' + experience.personal}</CustomText>
          </View>

          <TouchableWithoutFeedback onPress={() => navigate('EditExperience', {experience: experience})}>
            <View style={styles.bottom_button}>
              <ColorButton title={'Edit'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </Container>
  );

  function onShare() {

  }
};

const styles = StyleSheet.create({
  gradient_container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
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
    height: 33,
    flexDirection: 'row',
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  share_icon: {
    position: 'absolute',
    right: 24,
    width: 20,
    height: '100%',
  },
  image_container: {
    height: 375,
    width: '100%',
  },
  image: {
    width: viewportWidth,
    height: '100%',
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  page_control_container: {
    position: 'absolute',
    width: '100%', 
    height: 60, 
    bottom: 0,
    alignContent: 'center',
    backgroundColor: '#0001',
  },
  page_control: {
    marginTop: 27,
    bottom: 0,
    height: 6,
    width: '100%',
  },
  content_container: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 20,
  },
  title: {
    marginTop: 22,
    lineHeight: 24,
    fontFamily: FONT.AN_Regular,
    fontSize: 24,
    color: COLOR.blackColor,
  },
  location: {
    marginTop: 12,
    lineHeight: 14,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.alphaBlackColor75,
  },
  host_name: {
    marginTop: 10,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    fontSize: 20,
    color: COLOR.blackColor,
  },
  avatar: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  about: {
    marginTop: 12,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.alphaBlackColor75,
  },
  bottom_container: {
    position: 'absolute',
    width: '100%',
    height: 110,
    flex: 1,
    bottom: 0,
    flexDirection: 'row',
  },
  price_container: {
    marginTop: 36,
    marginLeft: 24,
    height: 16,
    flexDirection: 'row',
  },
  price: {
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Bold,
    fontSize: 16,
    color: COLOR.systemBlackColor,
  },
  personal: {
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemBlackColor,
  },
  bottom_button: {
    position: 'absolute',
    top: 22,
    right: 24,
    width: 140,
    height: 44,
  },
});
