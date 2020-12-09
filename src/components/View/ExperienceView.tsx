import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SvgUri, SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  FONT,
  Img_Category
} from '../../constants';
import { IExperience } from '../../interfaces/app';

interface props {
  experience: IExperience;
  white_color: boolean;
}

export const ExperienceView: React.FC<props> = (props: props) => {

  const { navigate } = useNavigation();

  const experience: IExperience = props.experience;
  const white_color: boolean = props.white_color;
  
  return (
    <TouchableWithoutFeedback onPress={() => navigate('ExperienceDetail' , {experience: experience}) }>
      <View style={styles.container}>
        <Image
          style={styles.image}
          // source={(props.experience.image == null || props.experience.image == '') ? Img_Experience_1 : {uri: props.experience.image}}
          // test
          source={Img_Category}
        />
        <Text style={{...styles.title, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{props.experience.title}</Text>
        <View style={styles.experienceContainer}>
          {/* {
            props.experience.experience_icon != null && props.experience.experience_icon != ''
            ? <SvgUri width='100%' height='100%' uri={props.experience.experience_icon} />
            : null
          } */}
          {/* // test */}
          <SvgXml height='100%' xml={props.experience.experience_icon} />
          <Text style={{...styles.experience, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{props.experience.experience + ' • ' + props.experience.duration}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={{...styles.price, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{'From ' + props.experience.min_price + '$'}</Text>
          <Text style={{...styles.personal, color: white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}}>{' / ' + props.experience.personal}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
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
