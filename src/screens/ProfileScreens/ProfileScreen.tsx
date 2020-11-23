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
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// from app
import { COLOR, FONT, LOGIN_USER_ID, MARGIN_TOP, setLoginUserID } from '../../constants';
import { useCompletedBookings, useUpcomingBookings } from '../../hooks';
import { IBooking } from '../../interfaces/app';
import { ProfileView } from '../../components/View';


const { width: viewportWidth } = Dimensions.get('window');

export const ProfileScreen: React.FC = () => {
  
  const { navigate, goBack } = useNavigation();
  const { upcomingBookings } = useUpcomingBookings();
  const { completedBookings } = useCompletedBookings();

  const [ selectedTab, setSelectedTab ] = useState<number>(0);

  useEffect(() => {
    setLoginUserID(1);
  }, [])

  var fetching = false;

  return (
    <View style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      <SafeAreaView style={styles.safe_area}>
        {
          LOGIN_USER_ID == 2
          ? <ProfileView />
          : <View style={{width: '100%', height: '100%', alignItems: 'center', flex: 1}}>
            <TouchableWithoutFeedback onPress={() => navigate('PaymentOptions') }>
              <Text style={{width: 150, height: 50, marginTop: 100, color: COLOR.systemWhiteColor}}>
                Payment Methods
              </Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigate('Withdrawal') }>
              <Text style={{width: 150, height: 50, marginTop: 30, color: COLOR.systemWhiteColor}}>
                Withdrawal
              </Text>
            </TouchableWithoutFeedback>
          </View>
        }
      </SafeAreaView>
    </View>
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
});
