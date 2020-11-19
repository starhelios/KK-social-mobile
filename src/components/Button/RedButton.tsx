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
}

export const RedButton: React.FC<props> = (props: props) => {
  return (
    <View style={styles.button}>
      <Text style={styles.button_text}>{props.title}</Text>
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
    fontFamily: FONT.ANC_Bold,
    color: COLOR.whiteColor,
    fontSize: 14,
  },
});
