import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
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
  Icon_Back, 
  Img_Auth_Background,
  MARGIN_TOP,
} from '../../constants';
import { MyExperienceView } from '../../components/View';
import { IExperience } from '../../interfaces/app';
import { useExperiences } from '../../hooks';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const ExperiencesScreen: React.FC = () => {

  const { navigate, goBack } = useNavigation();
  const { experiences } = useExperiences();


  const [experienceList, setExperienceList] = useState<IExperience[]>([]);

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
      
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Auth_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Experiences</Text>

          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

          <View style={styles.input_container}>
            <View style={{width:'100%'}}>
              <Text style={styles.info_title}>My Experiences</Text>
              <FlatList
                style={{width: '100%', marginTop: 0, marginLeft: 0, height: '100%'}}
                contentContainerStyle={{paddingVertical: 0}}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                data={experienceList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <MyExperienceView experience={item} width={viewportWidth - 48} />}
              />
            </View>
          </View>
      </SafeAreaView>
    </Container>
  );

  function onAddBankAccount() {
    console.log('Add Bank Account');
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
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.systemWhiteColor,
  },
});
