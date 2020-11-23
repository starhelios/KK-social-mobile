import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR,
  LOADING_TIME,
  Img_Splash_Background, 
  Icon_Tab_Bar_Booking_Select,
} from '../../constants';

export const SplashScreen: React.FC = () => {

  const { navigate } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate('TabBar');
    }, LOADING_TIME)
  }, [])

  return (
    <Container style={styles.background}>
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Splash_Background} />
      
      <View style={styles.icon} >
        <SvgXml width={75} height={130} xml={Icon_Tab_Bar_Booking_Select} />
      </View>
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
  icon: {
    position: 'absolute',
    width: 75,
    height: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
  }
});
