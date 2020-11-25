import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// from app
import { COLOR, LOGIN_USER_ID, setLoginUserID } from '../../constants';
import { NotLoginProfileView, LoginProfileView } from '../../components/View';
import { IUser } from '../../interfaces/app';
import { useGlobalState } from '../../redux/Store';


const { width: viewportWidth } = Dimensions.get('window');

export const ProfileScreen: React.FC = () => {
  
  const { navigate, goBack } = useNavigation();
  const profile: IUser = useGlobalState('userInfo');

  useEffect(() => {
  }, [])

  return (
    <Container style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      <SafeAreaView style={styles.safe_area}>
        {
          LOGIN_USER_ID == 0
          ? <NotLoginProfileView />
          : <LoginProfileView profile={profile} />
        }
      </SafeAreaView>
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
});
