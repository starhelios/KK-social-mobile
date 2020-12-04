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
  FlatList,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  FONT, 
  Icon_Back_Black,
  Icon_Location_Black,
  Icon_Rating_Black,
  Img_Avatar_1,
  MARGIN_TOP,
} from '../../constants';
import { IExperience, IHost } from '../../interfaces/app';
import GlobalStyle from '../../styles/global';
import { ExperienceView } from '../../components/View';
import { useExperiences } from '../../hooks';


const { width: viewportWidth } = Dimensions.get('window');

export const HostDetailScreen: React.FC = ({route}) => {

  const { navigate, goBack } = useNavigation();
  const { experiences } = useExperiences();
  
  const [experienceList, setExperienceList] = useState<IExperience[]>([]);

  const host: IHost = route.params.host;

  useEffect(() => {
    loadExperienceList();
  }, [])

  async function loadExperienceList() {
    await experiences()
    .then(async (result: Promise<IExperience[]>) => {
      setExperienceList(await result);
    }).catch(() => {
    });
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>

        <View style={styles.navigation_bar}>
          <Text style={styles.navigation_title}>{'Say Hello! to ' + host.username}</Text>

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
                <Text style={styles.host_name}>{'Hey, I\'m ' + host.username}</Text>
                <Text style={styles.joined_date}>{'Joined in ' + 'May 2020'}</Text>
              </View>
              <Image style={styles.avatar} source={Img_Avatar_1} />
            </View>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <Text style={{...styles.content_title, marginTop: 22}}>{'About this host'}</Text>
            <View style={{marginTop: 22, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Location_Black} />
              <Text style={{...styles.location, marginTop: 1, marginLeft: 8}}>{'Brooklyn, NY'}</Text>
            </View>

            <View style={{marginTop: 12, height: 16, flexDirection: 'row'}}>
              <SvgXml width={16} height={16} xml={Icon_Rating_Black} />
              <Text style={{...styles.location, marginTop: 1, marginLeft: 8}}>{'4.4 Stars • 127 Ratings'}</Text>
            </View>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <Text style={styles.description}>{'I am an American professional surfer, author, actor, model, businessman, and innovator, best known for my unprecedented 11 world surfing championships. I am widely regarded as the greatest professional surfer of all time.'}</Text>
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <Text style={{...styles.content_title, marginTop: 22}}>{host.username + '\'s Experiences'}</Text>
          </View>

          <FlatList
            style={{width: '100%', height: 284, marginTop: 22 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={experienceList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ExperienceView experience={item} white_color={false} />}
          />
        </ScrollView>
      </SafeAreaView>
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
    fontSize: 24,
    color: COLOR.blackColor,
  },
  joined_date: {
    marginTop: 12,
    height: 14,
    lineHeight: 14,
    color: COLOR.alphaBlackColor50,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
  avatar: {
    position: 'absolute',
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
  },
  content_title: {
    height: 20,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    fontSize: 20,
    color: COLOR.blackColor,
  },
  description: {
    marginTop: 22,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.blackColor,
  },
  location: {
    marginTop: 12,
    lineHeight: 14,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.alphaBlackColor75,
  },
});
