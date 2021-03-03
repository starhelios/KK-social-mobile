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
import { SvgXml } from 'react-native-svg';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';

// from app
import { API_CONFIG, COLOR, CustomText, FONT, Icon_Back, MARGIN_TOP, viewportWidth } from '../../constants';
import { useExperiences } from '../../hooks';
import { IExperienceDetail, ISpecificExperience } from '../../interfaces/app';
import { ConfirmedBookingView } from '../../components/View';
import { useGlobalState } from '../../redux/Store';
import { useNavigation } from '@react-navigation/native';


export const ConfirmedBookingsScreen: React.FC = () => {
  
  const userInfo = useGlobalState('userInfo');

  const { goBack } = useNavigation();
  const { getHostExperienceListByUserId } = useExperiences();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [upcomingBookingList, setUpcomingBookingList] = useState<ISpecificExperience[]>([]);
  const [completedBookingList, setCompletedBookingList] = useState<ISpecificExperience[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    getHostExperienceList();
  }, [])

  useEffect(() => {
    getHostExperienceList();
  }, [API_CONFIG]);

  const jsonCopy = (src: any) => {
    return JSON.parse(JSON.stringify(src));
  }

  const getHostExperienceList = async () => {
    await getHostExperienceListByUserId(userInfo.id)
    .then(async (result: Promise<IExperienceDetail[]>) => {
      setFetched(true);
      let upcomingExperiences: ISpecificExperience[] = [];
      let completedExperiences: ISpecificExperience[] = [];
      (await result).map((item: IExperienceDetail, idx: number) => {
        return Moment(item.endDay).format() >= Moment(new Date()).format() 
          ? item.specificExperience.map((subItem: ISpecificExperience, subIndex: number) => {
              if (subItem.usersGoing && subItem.usersGoing.length > 0) { 
                return upcomingExperiences.push(subItem);
              }
            })
          : item.specificExperience.map((subItem: ISpecificExperience, subIndex: number) => {
              if (subItem.usersGoing && subItem.usersGoing.length > 0) {  
                return completedExperiences.push(subItem);
              }
            })
      });

      setUpcomingBookingList(upcomingExperiences);
      setCompletedBookingList(completedExperiences);
    })
    .catch(() => {
      setUpcomingBookingList([]);
      setCompletedBookingList([]);
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
        <View style={styles.navigation_bar}>
          <View style={{width: '100%', height: '100%'}}>
            <CustomText style={styles.title}>Confirmed Bookings</CustomText>
            <TouchableWithoutFeedback onPress={() => goBack() }>
              <View style={styles.back_icon}>
                <SvgXml width='100%' height='100%' xml={Icon_Back} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

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
            renderItem={({item}) => <ConfirmedBookingView isCompleted={selectedTab == 0 ? false : true} specificExperience={item}  />}
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
  navigation_bar: {
    marginTop: MARGIN_TOP,
    width: '100%',
    height: 33,
    flexDirection: 'row',
    zIndex: 10,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  title: {
    width: '100%',
    height: 33, 
    lineHeight: 33,
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
    fontSize: 24, 
    textAlign: 'center',
    color: COLOR.systemWhiteColor,
  },
  tab_bar: {
    marginTop: 22,
    marginLeft: (viewportWidth - 236) / 2,
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
