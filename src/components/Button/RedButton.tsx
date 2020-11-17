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
    height: 46,
    backgroundColor: COLOR.redBackgroundColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  button_text: {
    marginTop: 15,
    height: 17,
    lineHeight: 17,
    fontFamily: FONT.Montserrat_Regular,
    color: COLOR.whiteColor,
    fontSize: 14,
  },
});
