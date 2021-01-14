import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

// from app
import { COLOR, convertStringToDateFormat, CustomText, FONT, viewportWidth } from '../../constants';
import { IAvailableDate, IExperience } from '../../interfaces/app';
import { ColorButton } from '../Button';
import GlobalStyle from '../../styles/global';


interface props {
  experience: IExperience;
  availableDate: IAvailableDate;
  onChooseDate: (availableDate: IAvailableDate) => void;
}



export const ExperienceDetailBookView: React.FC<props> = (props: props) => {

  const experience: IExperience = props.experience;
  const availableDate: IAvailableDate = props.availableDate;

  return (
    <View>
      {
        availableDate.show_date == true
        ? <CustomText style={styles.date}>{convertStringToDateFormat(availableDate.day, 'ddd, MMM D')}</CustomText>
        : null
      }

      <View style={styles.container}>
        <View>
          <CustomText style={styles.time}>{availableDate.startTime + ' - ' + availableDate.endTime + ' (EDT)'}</CustomText>
          <View style={styles.price_container}>
            <CustomText style={{...styles.time, fontWeight: '600'}}>{'$' + experience.price}</CustomText>
            <CustomText style={styles.time}>{' / person'}</CustomText>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={() => props.onChooseDate(availableDate) }>
          <View style={styles.button_container}>
            <ColorButton title='Choose' color={COLOR.systemWhiteColor} backgroundColor={COLOR.redColor} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{...GlobalStyle.auth_line, marginLeft: 24, width: viewportWidth - 48, marginTop: 18, backgroundColor: COLOR.alphaBlackColor20}} />
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    marginLeft: 24,
    marginTop: 44,
    height: 27,
    lineHeight: 27,
    color: COLOR.blackColor,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 20,
  },
  container: {
    marginLeft: 24,
    marginTop: 24,
    marginRight: 24,
    flexDirection: 'row',
    },
  time: {
    marginLeft: 1,
    marginTop: 0,
    height: 16,
    //fontweight: '500',
    lineHeight: 16,
    color: COLOR.blackColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
  },
  price_container: {
    marginLeft: 1,
    marginTop: 8,
    fontWeight: '600',
    flexDirection: 'row',
    height: 16,
  },
  button_container: {
    position: 'absolute',
    right: 0,
    height: 44,
    backgroundColor: COLOR.redColor,
    width: 120,
    borderRadius: 22,
  },
});
