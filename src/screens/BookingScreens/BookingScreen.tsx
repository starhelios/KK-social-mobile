import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// from app
import { COLOR, FONT, MARGIN_TOP } from '../../constants';
import { useCompletedBookings, useUpcomingBookings } from '../../hooks';
import { IBooking } from '../../interfaces/app';
import { BookingView } from '../../components/View';


const { width: viewportWidth } = Dimensions.get('window');

export const BookingScreen: React.FC = () => {
  
  const { navigate, goBack } = useNavigation();
  const { upcomingBookings } = useUpcomingBookings();
  const { completedBookings } = useCompletedBookings();

  const [ selectedTab, setSelectedTab ] = useState<number>(0);
  const [ upcomingBookingList, setUpcomingBookingList ] = useState<IBooking[]>([]);
  const [ completedBookingList, setCompletedBookingList ] = useState<IBooking[]>([]);

  useEffect(() => {
    loadUpcomingBookingList();
  }, [])

  async function loadUpcomingBookingList() {
    await upcomingBookings()
    .then(async (result: Promise<IBooking[]>) => {
      setUpcomingBookingList(await result);
    }).catch(() => {
    });
  }

  async function loadCompletedBookingList() {
    await completedBookings()
    .then(async (result: Promise<IBooking[]>) => {
      setCompletedBookingList(await result);
    }).catch(() => {
    });
  }

  var fetching = false;

  return (
    <Container style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      <SafeAreaView style={styles.safe_area}>
        <Text style={styles.title}>Booking</Text>

        <View style={styles.tab_bar}>
          <TouchableWithoutFeedback onPress={() => onShowUpcomingBooking()}>
            <View style={{
              ...styles.tab_upcoming,
              backgroundColor: selectedTab == 0 ? COLOR.blackColor : COLOR.clearColor}}>
              <Text style={{
                ...styles.tab_title, 
                color: selectedTab == 0 ? COLOR.whiteColor : COLOR.blackColor}}>
                Upcoming
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onShowCompletedBooking()}>
            <View style={{
              ...styles.tab_completed,
              backgroundColor: selectedTab == 0 ? COLOR.clearColor : COLOR.blackColor }}>
              <Text style={{
                ...styles.tab_title, 
                color: selectedTab == 0 ? COLOR.blackColor : COLOR.whiteColor}}>
                Completed
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <FlatList
          style={styles.booking_list}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={selectedTab == 0 ? upcomingBookingList : completedBookingList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <BookingView completed_booking={selectedTab == 0 ? false : true} booking={item} />}
        />
      </SafeAreaView>
    </Container>
  );

  function onShowUpcomingBooking() {
    setSelectedTab(0);
    loadUpcomingBookingList();
  }

  function onShowCompletedBooking() {
    setSelectedTab(1);
    loadCompletedBookingList();
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
    fontFamily: FONT.AN_Bold, 
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
    fontFamily: FONT.AN_Bold,
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
