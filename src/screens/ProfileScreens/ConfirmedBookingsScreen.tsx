import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Back,
  MARGIN_TOP,
} from '../../constants';
import { IBooking, IUser } from '../../interfaces/app';
// import { useConfirmedUpcomingBookings, useConfirmedCompletedBookings } from '../../hooks';
import { ConfirmedBookingView } from '../../components/View';
import { useGlobalState } from '../../redux/Store';


export const ConfirmedBookingsScreen: React.FC = () => {

  const userInfo = useGlobalState('userInfo');
  const hostList = useGlobalState('hostList');
  const experienceList = useGlobalState('experienceList');
  
  const { navigate, goBack } = useNavigation();
  // const { confirmedUpcomingBookings } = useConfirmedUpcomingBookings();
  // const { confirmedCompletedBookings } = useConfirmedCompletedBookings();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [upcomingBookingList, setUpcomingBookingList] = useState<IBooking[]>([]);
  const [completedBookingList, setCompletedBookingList] = useState<IBooking[]>([]);

  useEffect(() => {
    // loadUpcomingBookingList();
    setBookingList();
  }, [])

  useEffect(() => {
    setBookingList();
  }, [experienceList, userInfo]);

  function setBookingList() {
    let currentDate = new Date();

    var upcomingBookings: IBooking[] = [];
    var completedBookings: IBooking[] = [];
    
    for (let reservationBooking of userInfo.bookingInfo) {
      for (let experience of experienceList) {
        if (reservationBooking.experienceID != experience.id) {
          continue;
        }

        for (let booking of experience.dateAvaibility) {
          if (reservationBooking.dateAvaibilityID != booking._id) {
            continue;
          }

          var experienceHost: IUser | null = null;
          for (let host of hostList) {
            if (host.id == experience.userId) {
              experienceHost = host;
              break;
            }
          }
  
          var newBooking: IBooking = {
            id: reservationBooking._id,
            image: experience.images.length > 0 ? experience.images[0] : '',
            experience_icon: '',
            experience: experience.title,
            date: booking.day,
            hour: booking.startTime,
            duration: experience.duration,
            rating: 0,
            is_host: false,
            is_joined: false,
            host: experienceHost,
            paid: null,
            receive: null,
            completed: null,
            show_date: null,
          };
          if (reservationBooking.completed == false) {
            upcomingBookings.push(newBooking);
          } else {
            completedBookings.push(newBooking);
          }
        }
      }
    }

    setUpcomingBookingList(upcomingBookings);
    setCompletedBookingList(completedBookings);
  }

  // async function loadUpcomingBookingList() {
  //   await confirmedUpcomingBookings()
  //   .then(async (result: Promise<IBooking[]>) => {
  //     var list: IBooking[] = [];
  //     var currentDate = '';
  //     for (let i = 0; i < (await result).length; i++) {
  //       const booking = (await result)[i];
  //       booking.show_date = booking.date == currentDate ? false : true;
  //       currentDate = booking.date;
  //       list.push(booking);
  //     }
  //     setUpcomingBookingList(list);
  //   }).catch(() => {
  //   });
  // }

  // async function loadCompletedBookingList() {
  //   await confirmedCompletedBookings()
  //   .then(async (result: Promise<IBooking[]>) => {
  //     var list: IBooking[] = [];
  //     var currentDate = '';
  //     for (let i = 0; i < (await result).length; i++) {
  //       const booking = (await result)[i];
  //       booking.show_date = booking.date == currentDate ? false : true;
  //       currentDate = booking.date;
  //       list.push(booking);
  //     }
  //     setCompletedBookingList(list);
  //   }).catch(() => {
  //   });
  // }

  return (
    <Container style={styles.background}>

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Bookings</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{alignItems: 'center'}}>
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
        </View>
        
        <FlatList
          style={styles.booking_list}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={selectedTab == 0 ? upcomingBookingList : completedBookingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ConfirmedBookingView booking={item} isCompleted={selectedTab == 0 ? false : true} />}
        />
      </SafeAreaView>
    </Container>
  );

  function onShowUpcomingBookings() {
    setSelectedTab(0);
    // loadUpcomingBookingList();
  }

  function onShowCompletedBookings() {
    setSelectedTab(1);
    // loadCompletedBookingList();
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
    fontFamily: FONT.AN_Bold, 
    fontSize: 24, 
    textAlign: 'center',
    color: COLOR.systemWhiteColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  tab_bar: {
    marginTop: 33,
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
    width: '100%',
  }
});
