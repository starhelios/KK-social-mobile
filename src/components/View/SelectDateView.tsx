import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Calendar, CalendarList } from 'react-native-calendars';

// from app
import { 
  COLOR, 
  convertDateToDateFormat, 
  convertStringToDateFormat, 
  CustomText, 
  FONT,
  Icon_Close_Black,
  viewportWidth,
} from '../../constants';
import GlobalStyle from '../../styles/global';
import { ColorButton } from '../Button';


interface props {
  selectedDateList: string[];
  onCloseView: (visible: boolean) => void;
  onSelectDate: (selectedDate: string) => void;
}

export const SelectDateView: React.FC<props> = (props: props) => {

  const [currentDate, setCurrentDate] = useState<string>('')
  const [selectedDateList, setSelectedDateList] = useState<string[]>(props.selectedDateList);
  const [markedDates, setMarkedDates] = useState<any>();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  useEffect(() => {    
    setSelectedDateList(props.selectedDateList);
    if (props.selectedDateList.length > 0) {
      updateMarkerDate(props.selectedDateList);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
        <View style = {styles.container} />
      </TouchableWithoutFeedback>
      
      <View style = {styles.calendar_container}>
        <View style={styles.title_bar}>
          <CustomText style={styles.title}>Dates</CustomText>

          <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
            <View style = {styles.close_icon}>
              <SvgXml width={10} height='100%' xml={Icon_Close_Black} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginLeft: 24, marginRight: 24, width: viewportWidth - 48, marginTop: 0}} />

        <View style={styles.calendar}>
          {/* <Calendar
            current={ '2012-03-01' }
            // markedDates={ markedDates }
            minDate={'2012-05-10'}
            maxDate={'2012-05-30'}
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
              // if (day.dateString != selectedDate) {
              //   setSelectedDate(day.dateString);
              //   updateMarkerDate(day.dateString);
              // } else {
              //   setSelectedDate('');
              //   updateMarkerDate('');
              // }
            }}
            onDayLongPress={(day) => { console.log('selected day', day) }}
            onMonthChange={(month) => { console.log('month changed', month) }}
            enableSwipeMonths={true}
          /> */}

<CalendarList
      // testID={testIDs.calendarList.CONTAINER}
      current={convertDateToDateFormat(new Date(), 'YYYY-MM-DD')}
      markedDates={ markedDates }
      pastScrollRange={24}
      futureScrollRange={24}
      renderHeader={date => {
        const textStyle = {
          fontSize: 15,
          paddingTop: 10,
          fontFamily: FONT.AN_Bold,
          color: COLOR.systemBlackColor,
          paddingRight: 5,
        };

        return (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 10
            }}
          >
            <CustomText style={{marginLeft: 5, ...textStyle}}>{convertDateToDateFormat(date, 'MMMM yyyy')}</CustomText>
          </View>
        );
      }}
      theme={{
        'stylesheet.calendar.header': {
          dayHeader: {
            fontSize: 13,
            // fontFamily: FONT.AN_Regular,
            color: COLOR.alphaBlackColor50,
            height: 0,
          }
        },
        'stylesheet.day.basic': {
          today: {
            borderColor: COLOR.systemRedColor,
            // borderWidth: 0.8,
            // fontFamily: FONT.AN_Regular,
            // fontSize: 13,
          },
          todayText: {
            color: COLOR.systemRedColor,
            // fontFamily: FONT.AN_Regular,
            // fontSize: 13,
            // fontWeight: '800',
          }
        },
        'stylesheet.day.single': {
          day: {
            color: COLOR.systemRedColor,
            fontFamily: FONT.AN_Regular,
          }
        },
        'stylesheet.calendar-list.main': {

        },
        backgroundColor: COLOR.clearColor,
        calendarBackground: COLOR.clearColor,
      }}
      onDayPress={(day) => {
        if (day.dateString != selectedDate) {
          setSelectedDateList(day.dateString);
          updateMarkerDate(day.dateString);
        } else {
          setSelectedDateList([]);
          updateMarkerDate([]);
        }
      }}
    />
        </View>         
        
        {/* <TouchableWithoutFeedback onPress={() => props.onSelectDate(selectedDate)}>
          <View style={styles.bottom_button}>
            <ColorButton title={'Apply'} backgroundColor={COLOR.systemBlackColor} color={COLOR.systemWhiteColor} />
          </View>
        </TouchableWithoutFeedback> */}
      </View>
    </View>
  );

  function updateMarkerDate(dateList: string[]) {
    if (dateList.length > 0) {
      const newMarkedDate: {[key:string]: {selected: boolean, selectedColor: string}} = {};
      for (let i = 0; i < dateList.length; i++) {
        const dateString = dateList[i];
        newMarkedDate[dateString] = {selected: true, selectedColor: 'blue'};
      }
      setMarkedDates(newMarkedDate);
    } else {
      setMarkedDates(null);
    }
  }

  function onDateChange(date: Date, type: string) {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
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
    height: 420,
  },
  bottom_button: {
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    marginBottom: 33,
  },
});
