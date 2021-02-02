import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

// from app
import { COLOR, convertStringToDateFormat, CustomText, FONT, viewportWidth } from '../../constants';
import { IAvailableDateForCreate } from '../../interfaces/app';
import { ColorButton } from '../Button';
import GlobalStyle from '../../styles/global';


interface props {
  index: number;
  availableDate: IAvailableDateForCreate;
  onChooseDate: (index: number, availableDate: IAvailableDateForCreate) => void;
}

export const AvailabilityDateView: React.FC<props> = (props: props) => {

  const index: number = props.index;
  const availableDate: IAvailableDateForCreate = props.availableDate;

  return (
    <View>
      <CustomText style={styles.date}>{convertStringToDateFormat(availableDate.day, 'ddd, MMM D')}</CustomText>

      <View style={styles.container}>
        <CustomText style={styles.time}>{availableDate.startTime + ' - ' + availableDate.endTime + ' (EDT)'}</CustomText>

        <TouchableWithoutFeedback onPress={() => props.onChooseDate(index, availableDate) }>
          <View style={styles.button_container}>
            <ColorButton title='Edit' color={COLOR.systemWhiteColor} backgroundColor={COLOR.redColor} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{...GlobalStyle.auth_line, marginLeft: 24, width: viewportWidth - 48, marginTop: 15, backgroundColor: COLOR.alphaBlackColor20}} />
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    marginLeft: 24,
    marginTop: 20,
    height: 27,
    lineHeight: 27,
    color: COLOR.blackColor,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 18,
  },
  container: {
    marginLeft: 24,
    marginRight: 24,
    height: 44,
    flexDirection: 'row',
    },
  time: {
    marginLeft: 1,
    height: 44,
    lineHeight: 44,
    color: COLOR.blackColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
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
