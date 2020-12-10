import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Moment from 'moment';

// from app
import { 
  COLOR, 
  FONT,
  Icon_Close_Black,
} from '../../constants';
import GlobalStyle from '../../styles/global';
import { ColorButton } from '../Button';

interface props {
  selectedDate: string;
  onCloseView: (visible: boolean) => void;
  onSelectDate: (selectedDate: string) => void;
}

const { width: viewportWidth } = Dimensions.get('window');

export const SelectDatesView: React.FC<props> = (props: props) => {

  const [currentDate, setCurrentDate] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>(props.selectedDate);
  const [markedDates, setMarkedDates] = useState<any>();

  useEffect(() => {
    // LocaleConfig.defaultLocale = 'en';
    Moment.locale('en');
    
    setSelectedDate(props.selectedDate);
    if (props.selectedDate != '') {
      updateMarkerDate(props.selectedDate);
    }

    const currentDate = Moment(new Date()).format('YYYY-MM-DD');
    setCurrentDate(currentDate);
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
            current={ currentDate }
            markedDates={ markedDates }
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
            onDayPress={(day) => {
              if (day.dateString != selectedDate) {
                setSelectedDate(day.dateString);
                updateMarkerDate(day.dateString);
              } else {
                setSelectedDate('');
                updateMarkerDate('');
              }
            }}
            onDayLongPress={(day) => { console.log('selected day', day) }}
            onMonthChange={(month) => { console.log('month changed', month) }}
            enableSwipeMonths={true}
          />
        </View>
        
        
        <TouchableWithoutFeedback onPress={() => props.onSelectDate(selectedDate)}>
          <View style={styles.bottom_button}>
            <ColorButton title={'Apply'} backgroundColor={COLOR.systemBlackColor} color={COLOR.systemWhiteColor} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );

  function updateMarkerDate(dateString: string) {
    if (dateString != '') {
      const newMarkedDate: {[key:string]: {selected: boolean, selectedColor: string}} = {};
      newMarkedDate[dateString] = {selected: true, selectedColor: 'blue'};
      setMarkedDates(newMarkedDate);
    } else {
      setMarkedDates(null);
    }
  }
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
