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
  convertDateToDateFormat, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  Icon_Back_Black,
  MARGIN_TOP,
  viewportWidth,
} from '../../constants';
import { DurationInfo, IAvailableDateForCreate } from '../../interfaces/app';
import { AvailabilityDateView, SelectDateRangeView } from '../../components/View';
import { ColorButton } from '../../components/Button';


export const SelectAvailabilityDatesScreen: React.FC = ({route}) => {
  
  const { goBack } = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [startDay, setStartDay] = useState<string>(route.params.dateAvaibilityInfo.startDay);
  const [endDay, setEndDay] = useState<string>(route.params.dateAvaibilityInfo.endDay);
  const [dateAvaibility, setDateAvaibility] = useState<IAvailableDateForCreate[]>(route.params.dateAvaibilityInfo.dateAvaibility);
  const [durationInfo, setDurationInfo] = useState<DurationInfo>({ step: 0, startTime: new Date(), endTime: new Date() });

  useEffect(() => {
    if (dateAvaibility.length == 0) {
      onEditActiveDates();
    }
  }, [])

  const onEditActiveDates = () => {
    setDurationInfo({ step: 1, startTime: durationInfo.startTime, endTime: durationInfo.endTime })
  }

  const onDismiss = () => {
    Keyboard.dismiss;
    setDurationInfo({ step: 0, startTime: durationInfo.startTime, endTime: durationInfo.endTime });
  }

  const setCancelSelectDates = (visible: boolean) => {
    setDurationInfo({ step: 0, startTime: durationInfo.startTime, endTime: durationInfo.endTime });
  }

  const onChangeStartDate = (event: any, selectedDate: any) => {
    if (selectedDate === undefined) {
      onDismiss();
    } else {
      if (Platform.OS != 'ios') {
        console.log('start');
        setDurationInfo({ step: 3, startTime: selectedDate, endTime: durationInfo.endTime });
      } else {
        setDurationInfo({ step: 2, startTime: selectedDate, endTime: durationInfo.endTime });
      }
    }    
  };

  const onConfirmStartDate = () => {
    setDurationInfo({ step: 3, startTime: durationInfo.startTime, endTime: durationInfo.endTime });
  }

  const onChangeEndDate = (event: any, selectedDate: any) => {
    if (selectedDate === undefined) {
      onDismiss();
    } else {
      if (Platform.OS != 'ios') {
        console.log('end');
        setDurationInfo({ step: 0, startTime: durationInfo.startTime, endTime: selectedDate });
        onConfirmEndDate(durationInfo.startTime, selectedDate);
      } else {
        setDurationInfo({ step: 3, startTime: durationInfo.startTime, endTime: selectedDate });
      }
    }   
  };

  const onFilterSelectDate = (fromDate: string, endDate: string) => {
    setStartDay(fromDate);
    setEndDay(endDate);
    setDurationInfo({ step: 2, startTime: durationInfo.startTime, endTime: durationInfo.endTime });
  }

  const onConfirmEndDate = (startDate: Date, endDate: Date) => {
    var msDiff = endDate.getTime() - startDate.getTime();
    var minutes = Math.round(msDiff / (1000 * 60));
    if (minutes <= 0) {
      Alert.alert('', ERROR_MESSAGE.INVALID_EXPERIENCE_END_TIME);
      return;
    }

    setDurationInfo({ step: 0, startTime: durationInfo.startTime, endTime: durationInfo.endTime });

    if (selectedIndex == -1) {
      var startDateTime = new Date(startDay).getTime();
      var endDateTime = new Date(endDay).getTime();
      var currentTime = startDateTime;
  
      var avaibilityDates: IAvailableDateForCreate[] = [];
      while (currentTime <= endDateTime) {
        let avaibilityDate: IAvailableDateForCreate = {
          day: convertDateToDateFormat(new Date(currentTime), 'MMMM D, YYYY'), 
          startTime: convertDateToDateFormat(startDate, 'hh:mm a'), 
          endTime: convertDateToDateFormat(endDate, 'hh:mm a')};
        avaibilityDates.push(avaibilityDate);
        currentTime += 1000 * 60 * 60 * 24;
      }
      setDateAvaibility(avaibilityDates);
    } else if (selectedIndex < dateAvaibility.length) {
      var avaibilityDates: IAvailableDateForCreate[] = dateAvaibility;
      avaibilityDates[selectedIndex].startTime = convertDateToDateFormat(startDate, 'hh:mm a');
      avaibilityDates[selectedIndex].endTime = convertDateToDateFormat(endDate, 'hh:mm a');
      setDateAvaibility(avaibilityDates);
    }
  }

  const onEditActiveDate = (index: number, availableDate: IAvailableDateForCreate) => {
    setSelectedIndex(index);
    setDurationInfo({ step: 2, startTime: new Date(availableDate.day + ' ' + availableDate.startTime), endTime: new Date(availableDate.day + ' ' + availableDate.endTime) });
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
        visible = {durationInfo.step == 1 ? true : false}
        onRequestClose = {() => { } }>
        <SelectDateRangeView selectedFromDate={startDay} selectedEndDate={endDay} onCloseView={setCancelSelectDates} onSelectDate={onFilterSelectDate} />
      </Modal>

      { (durationInfo.step == 2 || durationInfo.step == 3) && (
        <TouchableWithoutFeedback onPress={onDismiss} accessible={false}>
          <View style={{position: 'absolute', top: 0, bottom: 0, width: '100%', backgroundColor: COLOR.alphaBlackColor20}}>
            <View style={{...styles.datePickerBackground, backgroundColor: Platform.OS == 'ios' ? COLOR.whiteColor : COLOR.clearColor }} >
              <View style={styles.datePickerContainer}>
                { durationInfo.step == 2
                ? <View>
                    <DateTimePicker
                      value={durationInfo.startTime}
                      onChange={onChangeStartDate}
                      mode='time'
                      style={styles.datePicker}
                      dateFormat={'shortdate'}
                      placeholderText="Select Start Time"
                    />

                    { Platform.OS == 'ios' &&
                      <TouchableWithoutFeedback onPress={() => onConfirmStartDate() }>
                        <View style={styles.datePickerConfirm}>
                          <CustomText style={styles.confirm_text}>Confirm</CustomText>
                        </View>
                      </TouchableWithoutFeedback>
                    }
                  </View>
                : <View>
                    <DateTimePicker
                      value={durationInfo.endTime}
                      onChange={onChangeEndDate}
                      style={styles.datePicker}
                      minimumDate={durationInfo.startTime}
                      mode='time'
                      dateFormat={'shortdate'}
                      placeholderText="Select End Time"
                    />

                    { Platform.OS == 'ios' && 
                      <TouchableWithoutFeedback onPress={() => onConfirmEndDate(durationInfo.startTime, durationInfo.endTime) }>
                        <View style={styles.datePickerConfirm}>
                          <CustomText style={styles.confirm_text}>Confirm</CustomText>
                        </View>
                      </TouchableWithoutFeedback>
                    }
                  </View>
                }
              </View>
            </View>

            <View style={styles.time_top_container}>
              <CustomText style={styles.time_text}>{ durationInfo.step == 2 ? 'Start Time' : 'End Time' }</CustomText>
              </View>
          </View>
        </TouchableWithoutFeedback>
      )}
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
    height: 150,
    backgroundColor: COLOR.whiteColor,
  },
  datePickerContainer: {
    flexDirection: 'row', 
    marginTop: 15, 
    marginLeft: 15, 
    width: viewportWidth - 30,
  },
  datePicker: {
    alignContent: 'center',
    marginTop: 3,
    width: viewportWidth - 30,
  },
  datePickerConfirm: {
    position: 'absolute',
    right: 0,
    width: 100,
    height: 35,
    borderColor: COLOR.alphaBlackColor20,
    borderWidth: 1,
    borderRadius: 10,
  },
  confirm_text: {
    width: '100%',
    height: 35,
    lineHeight: 35,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.blueColor,
  },
  time_top_container: {
    position: 'absolute', 
    width: '100%',
    top: 0,
    height: 100,
    backgroundColor: COLOR.whiteColor,
  },
  time_text: {
    position: 'absolute', 
    width: '100%',
    bottom: 5,
    height: 35,
    lineHeight: 35,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 20,
    color: COLOR.blackColor,
  },
  booking_list: {
    marginTop: 10,
    marginBottom: 50,
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
