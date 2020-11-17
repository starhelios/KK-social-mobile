import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { COLOR } from '../../constants';


const { width: viewportWidth } = Dimensions.get('window');

export const BookingScreen: React.FC = () => {
  
  const { navigate, goBack } = useNavigation();

  var fetching = false;

  return (
    <View style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      <Text style={{width: '100%', height: '100%', color: COLOR.whiteColor, top: 200, left: 100}}>Booking Tab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title_bar: {
    marginTop: 10,
    marginLeft: 0,
    width: viewportWidth,
    height: 44,
    alignItems: 'center',
  },
});
