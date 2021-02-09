import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// from app
import { COLOR, CustomText, FONT } from '../../constants';

interface props {
  title: string;
  color: string;
  backgroundColor: string;
}

export const ColorButton: React.FC<props> = (props: props) => {
  const title: string = props.title;
  const color: string = props.color;
  const backgroundColor: string = props.backgroundColor;

  return (
    <View style={{ ...styles.button, backgroundColor: backgroundColor }}>
      <CustomText style={{...styles.button_text, color: color }} numberOfLines={1}>{title}</CustomText>
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
    fontWeight: '600',
    color: COLOR.whiteColor,
    fontSize: 14,
  },
});
