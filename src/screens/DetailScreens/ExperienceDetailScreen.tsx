import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
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
  FONT, 
  Icon_Back,
  Icon_Back_Black,
  Icon_Experience_Black,
  Icon_Review_Black,
  Icon_Share_Black,
  Icon_Share_White,
  Icon_Time_Black,
  Img_Avatar_1,
  Img_Experience_2,
  MARGIN_TOP,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { IExperience } from '../../interfaces/app';
import GlobalStyle from '../../styles/global';


const { width: viewportWidth } = Dimensions.get('window');

export const ExperienceDetailScreen: React.FC = ({route}) => {

  const { navigate, goBack } = useNavigation();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [experienceImages, setExperienceImages] = useState<string[]>([]);
  const [isBlackHeader, setIsBlackHeader] = useState<boolean>(true)

  const experience: IExperience = route.params.experience;
  var scrollViewRef: ScrollView | null;

  useEffect(() => {
    // test
    var images: string[] = [];
    images.push('1');
    images.push('2');
    images.push('3');
    images.push('4');
    images.push('5');
    setExperienceImages(images);
  }, [])

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <ScrollView 
          ref={ref => { scrollViewRef = ref }}
          style={{position: 'absolute', width: '100%', height: '100%', bottom: 110, flex: 1}} 
          bounces={false} 
          onScrollEndDrag={(event: NativeSyntheticEvent<NativeScrollEvent>) => handleScroll(event)}
          showsVerticalScrollIndicator={false}>

          <View style={styles.image_container}>
            <FlatList
              style={{width: '100%', height: '100%'}}
              contentContainerStyle={{paddingHorizontal: 0}}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              bounces={false}
              horizontal={true}
              data={experience.images}
              keyExtractor={item => item}
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
                onPageIndicatorPress={(page) => console.log(page)}
              />
            </View>
          </View>

          <View style={styles.content_container}>
            <Text style={styles.title}>{experience.title}</Text>
            <Text style={styles.location}>{experience.location}</Text>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />
            
            <View style={{marginTop: 12, flexDirection: 'row'}}>
              <Text style={styles.host_name}>{'Hosted by ' + experience.host.username}</Text>
              <Image style={styles.avatar} source={Img_Avatar_1} />
            </View>

            <View style={{marginTop: 12, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Time_Black} />
              <Text style={{...styles.location, marginTop: 1, marginLeft: 8}}>{experience.duration}</Text>
            </View>

            <View style={{marginTop: 12, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Experience_Black} />
              <Text style={{...styles.location, marginTop: 1, marginLeft: 8}}>{experience.experience}</Text>
            </View>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <Text style={{...styles.host_name, marginTop: 22}}>About the experience</Text>
            <Text style={styles.about}>{experience.description}</Text>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <View style={{marginTop: 22, flexDirection: 'row'}}>
              <View style={{width: viewportWidth - 100}}>
                <Text style={styles.host_name}>{'Say Hello! to ' + experience.host.username}</Text>
                <Text style={styles.joined_date}>{'Joined in ' + 'May 2020'}</Text>
              </View>
              <Image style={styles.avatar} source={Img_Avatar_1} />
            </View>

            <View style={{marginTop: 22, flexDirection: 'row', height: 16}}>
              <SvgXml width={16} height='100%' xml={Icon_Review_Black} />
              <Text style={styles.review_count}>{'18 Reviews'}</Text>
            </View>

            <Text style={styles.about}>{experience.description}</Text>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <Text style={{...styles.host_name, marginTop: 22}}>{experience.host.username + '\'s Experiences'}</Text>
          </View>

          <FlatList
            style={{width: '100%', height: 206, marginTop: 22, marginBottom: 20 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={experienceImages}
            keyExtractor={item => item}
            renderItem={({item}) => renderExperienceImage(item) }
          />
        </ScrollView>

        {
          isBlackHeader == true 
          ? <LinearGradient
              colors={['#00000010', '#00000020']}
              style={styles.gradient_container}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}} >
            </LinearGradient>
          : <View style={{...styles.gradient_container, backgroundColor: COLOR.whiteColor, height: 104}}>
              <Text style={styles.navigation_title}>{experience.title}</Text>
            </View>
        }
        
        <View style={styles.navigation_bar}>
          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={isBlackHeader == true ? Icon_Back : Icon_Back_Black} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onShare()}>
            <View style={styles.share_icon}>
              <SvgXml width='100%' height='100%' xml={isBlackHeader == true ? Icon_Share_White : Icon_Share_Black} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.bottom_container}>
          <View style={styles.price_container}>
            <Text style={styles.price}>{'From $' + experience.min_price}</Text>
            <Text style={styles.personal}>{' / ' + experience.personal}</Text>
          </View>

          <TouchableWithoutFeedback onPress={() => navigate('ExperienceDetailBook', {experience: experience})}>
            <View style={styles.bottom_button}>
              <ColorButton title={'Book'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </Container>
  );

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    console.log(event.nativeEvent.contentOffset.y);
    if (event.nativeEvent.contentOffset.y < 280) {
      setIsBlackHeader(true);
    } else {
      setIsBlackHeader(false);
    }
  }

  function onShare() {

  }

  function renderExperienceImage(uri: string) {
    return (
      <View style={experience_image_styles.container}>
        <Image source={Img_Experience_2} style={experience_image_styles.image}/>
      </View>
    );
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
    height: 24,
    flexDirection: 'row',
  },
  navigation_title: {
    marginTop: 63,
    lineHeight: 14,
    height: 14,
    marginLeft: 55,
    width: viewportWidth - 110,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.blackColor,
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
  joined_date: {
    marginTop: 8,
    height: 12,
    lineHeight: 12,
    color: COLOR.alphaBlackColor50,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
  review_count: {
    marginLeft: 9,
    height: 16,
    lineHeight: 16,
    color: COLOR.alphaBlackColor75,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
  },
});

const experience_image_styles = StyleSheet.create({
  container: {
    width: 156, 
    height: 206, 
    borderRadius: 10, 
    marginRight: 16,
  },
  image: {
    resizeMode: 'cover', 
    overflow: 'hidden', 
    width: '100%', 
    height: '100%', 
    borderRadius: 10,
  },
});