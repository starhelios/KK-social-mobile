import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  Icon_Splash_Background, 
  Icon_Tab_Bar_Booking_Select,
  LOADING_TIME,
} from '../../constants';

export const SplashScreen: React.FC = () => {

  const { navigate } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate('TabBar');
    }, LOADING_TIME)
  }, [])

  return (
    <View style={styles.background}>
      <SvgXml width='100%' height='100%' xml={Icon_Splash_Background} />
      <View style={styles.icon} >
        <SvgXml width={75} height={130} xml={Icon_Tab_Bar_Booking_Select} />
      </View>
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
  icon: {
    position: 'absolute',
    width: 75,
    height: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
  }
});
