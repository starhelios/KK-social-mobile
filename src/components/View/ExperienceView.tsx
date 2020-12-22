import * as React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

// from app
import { 
  COLOR, 
  ERROR_MESSAGE, 
  FONT, 
  GetDurationString, 
  Icon_Category, 
  Img_Experience,
} from '../../constants';
import { IExperience, IExperienceDetail, IHostDetail } from '../../interfaces/app';
import { useExperiences, useHosts } from '../../hooks';


interface props {
  experience: IExperience;
  white_color: boolean;
  onFetchingData: (fetching: boolean) => void;
}

export const ExperienceView: React.FC<props> = (props: props) => {

  const experience: IExperience = props.experience;
  const white_color: boolean = props.white_color;

  const { navigate } = useNavigation();
  const { getExperienceDetail } = useExperiences();
  const { getHostDetail } = useHosts();
  
  return (
    <TouchableWithoutFeedback onPress={() => goExperienceDetailScreen() }>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={experience.images.length > 0 ? {uri: experience.images[0]} : Img_Experience} />
        <Text style={{...styles.title, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{experience.title}</Text>
        <View style={styles.experienceContainer}>
          {
            experience.icon != null && experience.icon != ''
            ? <Image
                style={{width: '100%', height: '100%', resizeMode: 'cover', overflow: 'hidden'}}
                source={{uri: experience.icon}} />
            : <SvgXml height='100%' xml={Icon_Category} />
          }          
          <Text style={{...styles.experience, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{experience.categoryName + ' • ' + GetDurationString(experience.duration)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={{...styles.price, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{'From ' + experience.price.toString() + '$'}</Text>
          {/* <Text style={{...styles.personal, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{' / ' + experience.personal}</Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  async function goExperienceDetailScreen() {
    props.onFetchingData(true);
    await getExperienceDetail(experience.id)
    .then(async (experienceDetail: Promise<IExperienceDetail>) => {
      getHostDetailInformation(await experienceDetail);
    }).catch(() => {
      props.onFetchingData(false);
      Alert.alert(ERROR_MESSAGE.GET_EXPERIENCE_DETAIL_FAIL);
    });
  }

  async function getHostDetailInformation(experienceDetail: IExperienceDetail) {
    await getHostDetail(experience.userId)
    .then(async (hostDetail: Promise<IHostDetail>) => {
      props.onFetchingData(false);
      navigate('ExperienceDetail' , {experienceDetail: experienceDetail, hostDetail: hostDetail});
    }).catch(() => {
      props.onFetchingData(false);
      Alert.alert(ERROR_MESSAGE.GET_HOST_DETAIL_FAIL);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    width: 154,
    height: 284,
    marginRight: 16,
    flexDirection: 'column',
  },
  image: { 
    width: '100%', 
    height: 206, 
    borderRadius: 10,
  },
  title: {
    width: '100%',
    height: 17,
    lineHeight: 17,
    marginTop: 12,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Bold,
    fontSize: 12,
  },
  experienceContainer: {
    marginTop: 6,
    height: 12,
    flexDirection: 'row',
  },
  experience: {
    height: 12,
    lineHeight: 12,
    marginLeft: 5,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
  priceContainer: {
    marginTop: 9,
    height: 12,
    flexDirection: 'row',
  },
  price: {
    height: 12,
    lineHeight: 12,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Bold,
    fontSize: 12,
  },
  personal: {
    height: 12,
    lineHeight: 12,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
});
