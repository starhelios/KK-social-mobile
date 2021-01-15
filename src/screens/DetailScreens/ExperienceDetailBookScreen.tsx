import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  convertDateToMomentDateFormat, 
  convertStringToDate, 
  convertStringToDateFormat, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  GetVisibleDateString, 
  Icon_Back_Black,
  Icon_Guest_Minus,
  Icon_Guest_Plus,
  Icon_Share_Black,
  MARGIN_TOP,
  ShowShareView,
  viewportWidth,
} from '../../constants';
import { IAvailableDate, IExperience, IHostDetail, IUser } from '../../interfaces/app';
import { ExperienceDetailBookView, SelectDateRangeView } from '../../components/View';


export const ExperienceDetailBookScreen: React.FC = ({route}) => {

  const experience: IExperience = route.params.experience;
  const hostDetail: IHostDetail = route.params.hostDetail;
  const host: IUser = hostDetail.user;

  const { goBack, navigate } = useNavigation();

  const [selectedFromDate, setSelectedFromDate] = useState<string>(convertStringToDateFormat(new Date().toLocaleDateString(), 'YYYY-MM-DD'));
  const [selectedEndDate, setSelectedEndDate] = useState<string>(convertStringToDateFormat(new Date().toLocaleDateString(), 'YYYY-MM-DD'));
  const [showSelectDates, setShowSelectDates] = useState<boolean>(false);
  const [guestCount, setGuestCount] = useState<number>(1)
  const [allAvailableDates, setAllAvailableDates] = useState<IAvailableDate[]>([]);
  const [availableDates, setAvailableDates] = useState<IAvailableDate[]>([]);

  useEffect(() => {
    var availableDates: IAvailableDate[] = [];
    var beforeDate = '';
    for (let i = 0; i < experience.dateAvaibility.length; i++) {
      var availableDate = experience.dateAvaibility[i];

      const startTime = convertStringToDate(availableDate.day + ' ' + availableDate.startTime);
      if (startTime == null || startTime < convertDateToMomentDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')) {
        continue;
      }

      if (availableDate.day != beforeDate) {
        availableDate.show_date = true;
        beforeDate = availableDate.day;
      } else {
        availableDate.show_date = false;
      }
      availableDates.push(availableDate);
    }
    setAllAvailableDates(availableDates);
    setAvailableDates(availableDates);

    onFilterSelectDate(selectedFromDate, selectedEndDate);
  }, []);

  const onFilterSelectDate = (fromDate: string, endDate: string) => {
    setSelectedFromDate(fromDate);
    setSelectedEndDate(endDate);

    if (fromDate == '') {
      setAvailableDates(allAvailableDates);
    } else {
      
      const from = convertStringToDate(fromDate);
      const end = convertStringToDate(endDate);

      if (from != null && end != null) {
        var availableDates: IAvailableDate[] = [];
        for (let i = 0; i < experience.dateAvaibility.length; i++) {
          var availableDate = experience.dateAvaibility[i];
          const startTime = convertStringToDate(availableDate.day + ' ' + availableDate.startTime);
          const startDate = convertStringToDate(availableDate.day);

          if (startTime != null && startDate != null) {
            if (startTime >= from && startDate <= end) {
              availableDates.push(availableDate);
            }
          }
        }
        setAvailableDates(availableDates);
      }
    }

    setShowSelectDates(false);
  }

  const onShare = () => {
    ShowShareView('KloutKast', 'https://kloutkast.herokuapp.com');
  }

  function onChooseDate(availableDate: IAvailableDate) {
    if (guestCount == 0) {
      Alert.alert(ERROR_MESSAGE.EMPTY_GUEST_COUNT);
      return;
    }
    
    navigate('ExperienceDetailConfirmPay', {experience: experience, availableDate: availableDate, guestCount: guestCount, hostDetail: hostDetail});
  }

  const onDecreaseGuestCount = () => {
    if (guestCount < 2) {
      setGuestCount(1);
    } else {
      setGuestCount(guestCount - 1);
    }
  }

  const onIncreaseGuestCount = () => {
    setGuestCount(guestCount + 1);
  }

  return (
    <Container style={{...styles.background, backgroundColor: COLOR.whiteColor}}>

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>{ 'Select Date & Time' }</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onShare}>
            <View style={styles.share_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Share_Black} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.tab_bar}>
          <TouchableWithoutFeedback onPress={() => setShowSelectDates(true)}>
            <View style={styles.tab_bar_date_container}>
              <CustomText style={styles.tab_bar_text}>{ GetVisibleDateString('Select Date', selectedFromDate, selectedEndDate) }</CustomText>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.tab_bar_count_container}>
            <CustomText style={styles.tab_bar_text}>{guestCount + ' guest'}</CustomText>

            <TouchableWithoutFeedback onPress={onDecreaseGuestCount}>
              <View style={styles.increase_count}>
                <SvgXml width='100%' height='100%' xml={Icon_Guest_Minus} />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={onIncreaseGuestCount}>
              <View style={styles.decrease_count}>
                <SvgXml width='100%' height='100%' xml={Icon_Guest_Plus} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={availableDates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ExperienceDetailBookView experience={experience} availableDate={item} onChooseDate={onChooseDate} />}
        />
      </SafeAreaView>

      <Modal animationType = {"slide"} transparent = {true}
        visible = {showSelectDates}
        onRequestClose = {() => { } }>
        <SelectDateRangeView selectedFromDate={selectedFromDate} selectedEndDate={selectedEndDate} onCloseView={setShowSelectDates} onSelectDate={onFilterSelectDate} />
      </Modal>
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
  share_icon: {
    position: 'absolute',
    right: 24,
    width: 20,
    height: '100%',
  },
  tab_bar: {
    marginLeft: 24,
    marginTop: 33,
    height: 40,
    flexDirection: 'row',
  },
  list: {
    marginTop: 5,
    flex: 1,
  },
  tab_bar_date_container: {
    width: 130,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.blackColor,
  },
  tab_bar_text: {
    width: '100%',
    height: 14, 
    lineHeight: 14,
    marginTop: 14,
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
    fontWeight: '600',
    textAlign: 'center',
    color: COLOR.systemBlackColor,
  },
  tab_bar_count_container: {
    width: viewportWidth - 190,
    marginLeft: 12,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.blackColor,
  },
  increase_count: {
    position: 'absolute',
    marginLeft: 3,
    marginTop: 3,
    width: 34,
    height: 34,
  },
  decrease_count: {
    position: 'absolute',
    right: 3,
    marginTop: 3,
    width: 34,
    height: 34,
  },
});
