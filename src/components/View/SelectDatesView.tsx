import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// from app
import { 
  COLOR, 
  FONT,
  Icon_Close_Black,
} from '../../constants';
import GlobalStyle from '../../styles/global';
import { ColorButton } from '../Button';

interface props {
  onCloseView: (visible: boolean) => void;
}

const { width: viewportWidth } = Dimensions.get('window');

export const SelectDatesView: React.FC<props> = (props: props) => {

  useEffect(() => {
    // LocaleConfig.defaultLocale = 'en';
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
        <View style = {styles.container} />
      </TouchableWithoutFeedback>
      
      <View style = {styles.calendar_container}>
        <View style={styles.title_bar}>
          <Text style={styles.title}>Dates</Text>

          <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
            <View style = {styles.close_icon}>
              <SvgXml width={10} height='100%' xml={Icon_Close_Black} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginLeft: 24, marginRight: 24, width: viewportWidth - 48, marginTop: 0}} />

        <View style={styles.calendar}>
          <Calendar
            current={'2020-12-01'}
            markedDates={{
              '2020-12-14': {selected: true, selectedColor: 'blue'},
              '2020-12-15': {selected: true, selectedColor: 'blue'},
            }}
            style={{backgroundColor: COLOR.clearColor}}
            theme={{
              backgroundColor: COLOR.clearColor,
              calendarBackground: COLOR.clearColor,
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: COLOR.systemWhiteColor,
              todayTextColor: COLOR.redColor,
              dayTextColor: COLOR.systemBlackColor,
              arrowColor: COLOR.systemBlackColor,
              monthTextColor: COLOR.systemBlackColor,
              indicatorColor: COLOR.systemBlackColor,
            }}
            onDayPress={(day) => { console.log('selected day', day) }}
            onDayLongPress={(day) => { console.log('selected day', day) }}
            onMonthChange={(month) => { console.log('month changed', month) }}
            enableSwipeMonths={true}
          />
        </View>
        
        
        <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
          <View style={styles.bottom_button}>
            <ColorButton title={'Apply'} backgroundColor={COLOR.systemBlackColor} color={COLOR.systemWhiteColor} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.alphaBlackColor50,
    flex: 1,
  },
  calendar_container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOR.whiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  title_bar: {
    height: 60,
    width: '100%',
  },
  title: {
    width: '100%',
    lineHeight: 60,
    fontFamily: FONT.AN_Regular,
    color: COLOR.systemBlackColor,
    fontSize: 16,
    textAlign: 'center',
  },
  close_icon: {
    position: 'absolute',
    width: 34,
    height: '100%',
    right: 10,
    alignItems: 'center',
  },
  calendar: {
    marginTop: 22,
    marginLeft: 24,
    marginRight: 24,
    height: 320,
  },
  bottom_button: {
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    marginBottom: 33,
  },
});
