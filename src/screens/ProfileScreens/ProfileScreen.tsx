import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';

// from app
import { COLOR } from '../../constants';
import { NotLoginProfileView, LoginProfileView } from '../../components/View';
import { IUser } from '../../interfaces/app';
import { useGlobalState } from '../../redux/Store';


const { width: viewportWidth } = Dimensions.get('window');

export const ProfileScreen: React.FC = () => {

  const profile: IUser = useGlobalState('userInfo');

  const [userID, setUserID] = useState<string>(profile.id);

  useEffect(() => {
    setUserID(profile.id);
  }, [profile])

  return (
    <Container style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      <SafeAreaView style={styles.safe_area}>
        {
          userID == ''
          ? <NotLoginProfileView />
          : <LoginProfileView />
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
