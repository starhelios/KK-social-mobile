import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

// from app
import { COLOR, CustomText, FONT, MARGIN_TOP, SortBookings, viewportWidth } from '../../constants';
import { useExperiences } from '../../hooks';
import { IBooking, IUser, IUserBooking } from '../../interfaces/app';
import { BookingView } from '../../components/View';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { ActionType } from '../../redux/Reducer';


export const BookingScreen: React.FC = () => {
  
  const dispatch = useDispatch();
  const userInfo = useGlobalState('userInfo');
  const hostList = useGlobalState('hostList');
  const experienceList = useGlobalState('experienceList');
  const needReloadReservedBookings = useGlobalState('needReloadReservedBookings');
  const { getReservedBookingList } = useExperiences();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [upcomingBookingList, setUpcomingBookingList] = useState<IUserBooking[]>([]);
  const [completedBookingList, setCompletedBookingList] = useState<IUserBooking[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    getUpcomingBookingList();
  }, [])

  const getUpcomingBookingList = async () => {
    getReservedBookingList(userInfo.id)
    .then(async (result: Promise<IUserBooking[]>) => {
      setUpcomingBookingList(await result);
      setFetched(true);
    })
    .catch(() => {
      setUpcomingBookingList([]);
      setFetched(true);
    })
  }

  const getCompletedBookingList = async () => {
    setCompletedBookingList([]);
  }

  useEffect(() => {
    if (needReloadReservedBookings == false) {
      return;
    }
    getUpcomingBookingList();

    dispatch({
      type: ActionType.SET_NEED_RELOAD_RESERVERD_BOOKINGS,
      payload: false,
    })
  }, [needReloadReservedBookings, userInfo]);

  return (
    <Container style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      <SafeAreaView style={styles.safe_area}>
        <CustomText style={styles.title}>Booking</CustomText>

        <View style={styles.tab_bar}>
          <TouchableWithoutFeedback onPress={() => onShowUpcomingBookings()}>
            <View style={{
              ...styles.tab_upcoming,
              backgroundColor: selectedTab == 0 ? COLOR.blackColor : COLOR.clearColor}}>
              <CustomText style={{
                ...styles.tab_title, 
                color: selectedTab == 0 ? COLOR.whiteColor : COLOR.blackColor}}>
                Upcoming
              </CustomText>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onShowCompletedBookings()}>
            <View style={{
              ...styles.tab_completed,
              backgroundColor: selectedTab == 0 ? COLOR.clearColor : COLOR.blackColor }}>
              <CustomText style={{
                ...styles.tab_title, 
                color: selectedTab == 0 ? COLOR.blackColor : COLOR.whiteColor}}>
                Completed
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>

        { fetched == true &&
          <FlatList
            style={styles.booking_list}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={selectedTab == 0 ? upcomingBookingList : completedBookingList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <BookingView completed_booking={selectedTab == 0 ? false : true} booking={item} />}
          />
        }
      </SafeAreaView>

      <Spinner
        visible={!fetched}
        textContent={''}
        textStyle={{color: COLOR.systemWhiteColor}}
      />
    </Container>
  );

  function onShowUpcomingBookings() {
    setSelectedTab(0);
    getUpcomingBookingList();
  }

  function onShowCompletedBookings() {
    setSelectedTab(1);
    getCompletedBookingList();
  }
};

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    flex: 1, 
    backgroundColor: COLOR.blackColor, 
    alignItems: 'center',
  },
  safe_area: {
    width: '100%',
    flex: 1,
  },
  title: {
    marginTop: MARGIN_TOP, 
    marginLeft: 24, 
    marginRight: 24, 
    backgroundColor: COLOR.clearColor, 
    height: 33, 
    lineHeight: 33,
    fontFamily: FONT.AN_Regular, 
    fontWeight: '600',
    fontSize: 24, 
    color: COLOR.systemWhiteColor,
  },
  tab_bar: {
    marginTop: 22,
    marginLeft: 24,
    width: 236,
    height: 48,
    backgroundColor: COLOR.whiteColor,
    borderRadius: 24,
    flexDirection: 'row',
  },
  tab_upcoming: {
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 4,
    width: 110,
    height: 40,
    borderRadius: 20,
    alignItems: 'center', 
    justifyContent: 'space-evenly',
  },
  tab_completed: {
    position: 'absolute',
    right: 4,
    marginTop: 4,
    marginBottom: 4,
    width: 116,
    height: 40,
    borderRadius: 20,
    alignItems: 'center', 
    justifyContent: 'space-evenly',
  },
  tab_title: {
    backgroundColor: COLOR.clearColor,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  booking_list: {
    marginTop: 22, 
    marginLeft: 24, 
    marginRight: 24, 
    width: viewportWidth - 48,
  }
});
