import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';

// from app
import { 
  COLOR, 
  convertStringToDateFormat, 
  convertStringToMomentDateFormat, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  Icon_Back_Black,
  MARGIN_TOP,
  viewportWidth,
} from '../../constants';
import { IAvailableDateForCreate } from '../../interfaces/app';
import { AvailabilityDateView, SelectDateRangeView } from '../../components/View';
import { ColorButton } from '../../components/Button';
import moment from 'moment';


export const SelectAvailabilityDatesScreen: React.FC = ({route}) => {
  
  const { goBack } = useNavigation();

  const toLocalTimeString = (date: Date) => {
    return convertStringToMomentDateFormat(date.toLocaleDateString() + ' ' + date.toLocaleTimeString(), 'hh:mm a')
  }

  const duration: string = route.params.duration;

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [startTimeString, setStartTimeString] = useState<string>(toLocalTimeString(startTime));
  const [endTimeString, setEndTimeString] = useState<string>(toLocalTimeString(endTime));
  const [modalType, setModalType] = useState<number>(0);
  const [showBottomBar, setShowBottomBar] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [startDay, setStartDay] = useState<string>(route.params.dateAvaibilityInfo.startDay);
  const [endDay, setEndDay] = useState<string>(route.params.dateAvaibilityInfo.endDay);
  const [dateAvaibility, setDateAvaibility] = useState<IAvailableDateForCreate[]>(route.params.dateAvaibilityInfo.dateAvaibility);

  useEffect(() => {
    if (dateAvaibility.length == 0) {
      onEditActiveDates();
    }

    if (duration != '') {
      let durationValue = parseInt(duration);
      let tempEndDate = new Date(startTime);
      tempEndDate.setHours(tempEndDate.getHours(), tempEndDate.getMinutes() + durationValue , 0 , 0);
      setEndTime(tempEndDate);
      setEndTimeString(toLocalTimeString(tempEndDate));
    }
  }, [])

  const onEditActiveDates = () => {
    setModalType(1);
  }

  const onDismiss = () => {
    Keyboard.dismiss();
    setModalType(0);
    setShowBottomBar(false);
  }

  const setCancelSelectDates = (visible: boolean) => {
    setModalType(0);
    setShowBottomBar(false);
  }

  const onFilterSelectDate = (fromDate: string, endDate: string) => {
    setStartDay(fromDate);
    setEndDay(endDate);
    setModalType(0);
    setShowBottomBar(true);
  }

  const onChangeStartDate = (event: any, selectedDate: any) => {
    setModalType(0);
    if (selectedDate === undefined) {
    } else {
      setStartTime(selectedDate);
      setStartTimeString(toLocalTimeString(selectedDate));

      if (duration != '') {
        let durationValue = parseInt(duration);
        let tempEndDate = new Date(selectedDate);
        tempEndDate.setHours(tempEndDate.getHours(), tempEndDate.getMinutes() + durationValue , 0 , 0);
        setEndTime(tempEndDate);
        setEndTimeString(toLocalTimeString(tempEndDate));
      } else {
        setEndTime(selectedDate);
        setEndTimeString(toLocalTimeString(selectedDate));
      }
    }    
  };

  const onChangeEndDate = (event: any, selectedDate: any) => {
    setModalType(0);

    if (selectedDate === undefined) {
    } else {
      setEndTime(selectedDate);
      setEndTimeString(toLocalTimeString(selectedDate));
    }   
  };

  const onConfirmTime = () => {
    let msDiff = endTime.getTime() - startTime.getTime();
    let minutes = Math.round(msDiff / (1000 * 60));
    if (minutes <= 0) {
      Alert.alert('', ERROR_MESSAGE.INVALID_EXPERIENCE_END_TIME);
      return;
    }

    setModalType(0);
    setShowBottomBar(false);

    if (selectedIndex == -1) {
      let startDateTime = new Date(startDay).getTime();
      let endDateTime = new Date(endDay).getTime();
      let currentTime = startDateTime;
  
      let avaibilityDates: IAvailableDateForCreate[] = [];
      while (currentTime <= endDateTime) {
        let bookingCurrentTime = new Date(startTime);
        
        while (bookingCurrentTime < endTime) {
          let bookingStartTime = toLocalTimeString(bookingCurrentTime);
          bookingCurrentTime.setHours(bookingCurrentTime.getHours(), bookingCurrentTime.getMinutes() + parseInt(duration) , 0 , 0);
          if (bookingCurrentTime > endTime) {
            break;
          }
          let bookingEndTime = toLocalTimeString(bookingCurrentTime);
          let avaibilityDate: IAvailableDateForCreate = {
            day: convertStringToDateFormat(new Date(currentTime).toLocaleDateString(), 'MMMM D, YYYY'), 
            startTime: bookingStartTime, 
            endTime: bookingEndTime};
          avaibilityDates.push(avaibilityDate);
        }

        currentTime += 1000 * 60 * 60 * 24;
      }
      setDateAvaibility(avaibilityDates);

    } else if (selectedIndex < dateAvaibility.length) {
      let avaibilityDates: IAvailableDateForCreate[] = dateAvaibility;
      avaibilityDates[selectedIndex].startTime = startTimeString;
      avaibilityDates[selectedIndex].endTime = endTimeString;
      setDateAvaibility(avaibilityDates);
    }
  }

  const onEditActiveDate = (index: number, availableDate: IAvailableDateForCreate) => {
    setSelectedIndex(index);

    setStartTimeString(availableDate.startTime);
    setEndTimeString(availableDate.endTime);
    setStartTime(new Date(availableDate.day + ' ' + availableDate.startTime));
    setEndTime(new Date(availableDate.day + ' ' + availableDate.endTime));
    setShowBottomBar(true);
  }

  const onSave = () => {
    route.params.setDateAvaibilityInfo({startDay: startDay, endDay: endDay, dateAvaibility: dateAvaibility});
    goBack();
  }
  
  return (
    <Container style={{...styles.background, backgroundColor: COLOR.whiteColor}}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Active Dates</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onEditActiveDates}>
            <View style={styles.edit_button}>
              <CustomText style={styles.edit_text}>Edit All</CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <FlatList
          style={styles.booking_list}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={dateAvaibility}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => <AvailabilityDateView availableDate={item} index={index} onChooseDate={onEditActiveDate} />}
        />

        <TouchableWithoutFeedback onPress={onSave}>
          <View style={styles.bottom_button}>
            <ColorButton title={'Save'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <Modal animationType = {"slide"} transparent = {true}
        visible = {modalType == 1 ? true : false}
        onRequestClose = {() => { } }>
        <SelectDateRangeView selectedFromDate={startDay} selectedEndDate={endDay} onCloseView={setCancelSelectDates} onSelectDate={onFilterSelectDate} />
      </Modal>

      { showBottomBar == true && 
        <TouchableWithoutFeedback onPress={onDismiss} accessible={false}>
          <View style={{position: 'absolute', top: 0, bottom: 0, width: '100%', backgroundColor: COLOR.alphaBlackColor20}}>
            <View style={styles.datePickerBackground} >
              <View style={styles.datePickerContainer}>
                <View style={{flexDirection: 'row', marginTop: 10, width: '100%'}}>
                  <CustomText style={styles.time_title}>{ 'Start Time' }</CustomText>

                  { Platform.OS != 'android'
                    ? <DateTimePicker
                        value={startTime}
                        onChange={onChangeStartDate}
                        mode='time'
                        style={styles.datePicker}
                        dateFormat={'shortdate'}
                        placeholderText="Select Start Time"
                      />
                    : <TouchableWithoutFeedback onPress={() => setModalType(2)} accessible={false}>
                        <View style={styles.time_content_container}>
                          <CustomText style={styles.time_content}>{ startTimeString }</CustomText>
                        </View>
                      </TouchableWithoutFeedback>
                  }                  
                  <TouchableWithoutFeedback onPress={() => onConfirmTime() }>
                    <View style={styles.datePickerConfirm}>
                      <CustomText style={styles.confirm_text}>Confirm</CustomText>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={{flexDirection: 'row', marginTop: 15, width: '100%'}}>
                  <CustomText style={styles.time_title}>{ 'End Time' }</CustomText>

                  { Platform.OS != 'android'
                    ? <DateTimePicker
                        value={endTime}
                        onChange={onChangeEndDate}
                        style={styles.datePicker}
                        mode='time'
                        dateFormat={'shortdate'}
                        placeholderText="Select End Time"
                      />
                    : <TouchableWithoutFeedback onPress={() => setModalType(3)} accessible={false}>
                        <View style={styles.time_content_container}>
                          <CustomText style={styles.time_content}>{ endTimeString }</CustomText>
                        </View>
                      </TouchableWithoutFeedback>
                  }
                </View>
              </View>
            </View>

            { Platform.OS == 'android' && modalType == 2 && 
              <DateTimePicker
                value={startTime}
                onChange={onChangeStartDate}
                mode='time'
                style={styles.datePicker}
                dateFormat={'shortdate'}
                placeholderText="Select Start Time"
              />
            }
            { Platform.OS == 'android' && modalType == 3 && 
              <DateTimePicker
                value={endTime}
                onChange={onChangeEndDate}
                style={styles.datePicker}
                // minimumDate={new Date('2021-01-01 ' + startTime)}
                mode='time'
                dateFormat={'shortdate'}
                placeholderText="Select End Time"
              />
            }
          </View>
        </TouchableWithoutFeedback>
      }
    </Container>
  );
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
    backgroundColor: COLOR.whiteColor
  },
  title: {
    width: '100%',
    height: 33, 
    lineHeight: 33,
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
    fontWeight: '600',
    textAlign: 'center',
    color: COLOR.systemBlackColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  edit_button: {
    position: 'absolute',
    right: 24,
    width: 60,
    height: '100%',
  },
  edit_text: {
    position: 'absolute',
    color: COLOR.blackColor,
    fontFamily: FONT.AN_Bold,
    fontSize: 14,
    textAlign: 'right',
    bottom: 0,
    width: '100%',
    height: 24,
  },
  datePickerBackground: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    width: '100%',
    height: 200,
    backgroundColor: COLOR.whiteColor,
  },
  datePickerContainer: {
    marginTop: 15, 
    marginLeft: 15, 
    width: viewportWidth - 30,
  },
  datePicker: {
    marginLeft: 20,
    alignContent: 'center',
    width: 200,
    height: 44,
  },
  datePickerConfirm: {
    position: 'absolute',
    right: 0,
    width: 100,
    height: 44,
    borderColor: COLOR.alphaBlackColor20,
    borderWidth: 1,
    borderRadius: 10,
  },
  confirm_text: {
    width: '100%',
    height: 44,
    lineHeight: 44,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.blueColor,
  },
  time_title: {
    width: 80,
    height: 44,
    lineHeight: 44,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.blackColor,
  },
  time_content_container: {
    width: 120,
    height: 44,
    backgroundColor: '#0001',
    borderRadius: 10,
  },
  time_content: {
    width: 120,
    height: 44,
    lineHeight: 44,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    fontWeight: '500',
    color: COLOR.blueColor,
    textAlign: 'center',
  },
  booking_list: {
    marginTop: 10,
    marginBottom: 80,
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  bottom_button: {
    position: 'absolute',
    marginTop: 22,
    bottom: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
});
