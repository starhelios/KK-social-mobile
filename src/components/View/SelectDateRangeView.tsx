import * as React from 'react';
import {
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import CalendarPicker from 'react-native-calendar-picker';

// from app
import { 
  COLOR, 
  convertDateToDateFormat, 
  convertStringToDate, 
  convertStringToDateFormat, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT,
  Icon_Close_Black,
  viewportWidth,
} from '../../constants';
import GlobalStyle from '../../styles/global';
import { ColorButton } from '../Button';


interface props {
  selectedFromDate: string;
  selectedEndDate: string;
  onCloseView: (visible: boolean) => void;
  onSelectDate: (fromDate: string, endDate: string) => void;
}

export const SelectDateRangeView: React.FC<props> = (props: props) => {

  // const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(convertStringToDate(props.selectedFromDate));
  // const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(convertStringToDate(props.selectedEndDate));
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [markedDates, setMarkedDates] = useState<any>();

  const onDateChange = (date: Date, type: string) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedFromDate(date);
      setSelectedEndDate(null);
    }
  }

  const onFilter = () => {
    if (selectedFromDate != null && selectedEndDate == null) {
      Alert.alert('', ERROR_MESSAGE.EMPTY_END_DATE);
      return;
    }

    console.log(selectedFromDate);
    console.log(convertDateToDateFormat(selectedFromDate, 'YYYY-MM-DD HH:mm:ss'));

    props.onSelectDate(
      selectedFromDate != null ? convertDateToDateFormat(selectedFromDate, 'YYYY-MM-DD') : '', 
      selectedEndDate != null ? convertDateToDateFormat(selectedEndDate, 'YYYY-MM-DD') : '')
  }

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
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={new Date()}
            // maxDate={maxDate}
            // weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
            // months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
            previousTitle="<"
            nextTitle=">"
            todayBackgroundColor={COLOR.redColor}
            selectedDayColor={COLOR.blueColor}
            selectedDayTextColor={COLOR.systemBlackColor}
            scaleFactor={375}
            textStyle={{
              fontFamily: FONT.AN_Regular,
              color: COLOR.systemBlackColor,
            }}
            onDateChange={onDateChange}
          />
        </View>         
        
        <TouchableWithoutFeedback onPress={onFilter}>
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
    fontWeight: '600',
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
