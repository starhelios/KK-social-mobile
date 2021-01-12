import * as React from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Detail_Right_Arrow_White, 
  Icon_Experience_Rating, 
  Img_Experience
} from '../../constants';
import { IExperience } from '../../interfaces/app';

interface props {
  experience: IExperience;
  width: number;
}

export const MyExperienceView: React.FC<props> = (props: props) => {

  const { navigate } = useNavigation();

  const experience: IExperience = props.experience;
  const width: number = props.width;

  return (
    <TouchableWithoutFeedback onPress={() => navigate('ExperienceDetailHost' , {experience: experience}) }>
      <View>
        <View style={{flexDirection: 'row', marginTop: 22}}>
          <Image
            style={styles.image}
            // source={(experience.image == null || experience.image == '') ? Img_Experience_1 : {uri: experience.image}}
            // test
            source={Img_Experience}
          />

          <View style={{...styles.content_container, width: width - 166}}>
            <CustomText style={styles.title} numberOfLines={2}>{experience.title}</CustomText>

            <View style={styles.rating_container}>
              <SvgXml width={15} height={15} xml={Icon_Experience_Rating} />
              <CustomText style={styles.rating_text} numberOfLines={1}>
                {experience.rating.toString() + ' (' + experience.rating_count.toString() + ')'}
              </CustomText>
            </View>
          </View>

          <View style={styles.arrow_container}>
            <SvgXml width={5} height={10} xml={Icon_Detail_Right_Arrow_White} />
          </View>
        </View>

        <View style={styles.info_line} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: { 
    width: 125, 
    height: 100, 
    borderRadius: 10,
  },
  content_container: {
    marginLeft: 12,
    marginTop: 16,
  },
  title: {
    width: '100%',
    height: 40,
    lineHeight: 20,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
  },
  rating_container: {
    marginTop: 15,
    height: 15,
    flexDirection: 'row',
  },
  rating_text: {
    height: 15,
    lineHeight: 15,
    marginLeft: 5,
    color: COLOR.alphaWhiteColor75,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
  arrow_container: {
    marginLeft: 24,
    width: 5,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info_line: {
    marginTop: 22,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor20,
  },
});
