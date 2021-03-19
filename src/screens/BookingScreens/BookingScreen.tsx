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
import Spinner from 'react-native-loading-spinner-overlay';

// from app
import { API_CONFIG, COLOR, CustomText, FONT, MARGIN_TOP, viewportWidth } from '../../constants';
import { useExperiences } from '../../hooks';
import { IUserBooking } from '../../interfaces/app';
import { BookingView } from '../../components/View';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { ActionType } from '../../redux/Reducer';


export const BookingScreen: React.FC = () => {
  
  const userInfo = useGlobalState('userInfo');
  const reservedBookingList = useGlobalState('reservedBookingList');

  const dispatch = useDispatch();
  const { getReservedBookingList, completeBooking } = useExperiences();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [upcomingBookingList, setUpcomingBookingList] = useState<IUserBooking[]>([]);
  const [completedBookingList, setCompletedBookingList] = useState<IUserBooking[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);


  useEffect(() => {
    getReservedBookings();
  }, [])

  useEffect(() => {
    getReservedBookings();
  }, [API_CONFIG]);

  useEffect(() => {
    const upcomingBookings = reservedBookingList.filter((element) => {
      return !element.completed;
    })
    setUpcomingBookingList(upcomingBookings)

    const completedBookings = reservedBookingList.filter((element) => {
      return element.completed;
    })
    setCompletedBookingList(completedBookings)

    const timeRightNow = new Date().toISOString();
    const itemsNeedUpdatedArray = upcomingBookings.map((item, idx) => {
      const itemTimeStamp = new Date(item.day + " " + item.endTime).toISOString();
      if (timeRightNow > itemTimeStamp){
        return item.id
      } else {
        return ''
      }
    }).filter((element) => {
      return element !== ''
    })

    if (itemsNeedUpdatedArray.length > 0) {
      completeBooking(itemsNeedUpdatedArray)
      .then((res) => {
        getReservedBookings();
      })
    }
  }, [reservedBookingList]);

  const getReservedBookings = async () => {
    await getReservedBookingList(userInfo.randomString)
    .then(async (result: Promise<IUserBooking[]>) => {
      dispatch({
        type: ActionType.SET_RESERVED_BOOKING_LIST,
        payload: await result,
      })
      setFetched(true);
    })
    .catch(() => {
      dispatch({
        type: ActionType.SET_RESERVED_BOOKING_LIST,
        payload: [],
      })
      setFetched(true);
    })
  }

  const onShowUpcomingBookings = () => {
    setSelectedTab(0);
  }

  const onShowCompletedBookings = () => {
    setSelectedTab(1);
  }

  return (
    <Container style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      <SafeAreaView style={styles.safe_area}>
        <CustomText style={styles.title}>Booking</CustomText>

        <View style={styles.tab_bar}>
          <TouchableWithoutFeedback onPress={ onShowUpcomingBookings }>
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

          <TouchableWithoutFeedback onPress={ onShowCompletedBookings }>
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
            renderItem={({item}) => <BookingView completed_booking={selectedTab == 0 ? false : true} booking={item} isHostRating={false} getReservedBookings={getReservedBookings} />}
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
