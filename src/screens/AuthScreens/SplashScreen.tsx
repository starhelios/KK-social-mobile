import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { COLOR } from '../../constants';


const { width: viewportWidth } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  
  const { navigate, goBack } = useNavigation();

  var fetching = false;

  return (
    <View style={{width: viewportWidth, flex: 1, backgroundColor: COLOR.blackColor}}>
      
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
