import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// from app
import { COLOR, FONT } from '../../constants';

interface props {
  title: string;
  color: string;
  backgroundColor: string;
}

export const ColorButton: React.FC<props> = (props: props) => {
  return (
    <View style={{ ...styles.button, backgroundColor: props.backgroundColor }}>
      <Text style={{...styles.button_text, color: props.color }}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    backgroundColor: COLOR.redColor,
    borderRadius: 24,
    alignItems: 'center',
  },
  button_text: {
    height: 44,
    lineHeight: 44,
    fontFamily: FONT.AN_Regular,
    color: COLOR.whiteColor,
    fontSize: 14,
  },
});
