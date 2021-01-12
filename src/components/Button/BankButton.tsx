import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

// from app
import { COLOR, CustomText, FONT } from '../../constants';
import { IBank } from '../../interfaces/app';

interface props {
  card: IBank;
}

export const BankButton: React.FC<props> = (props: props) => {
  return (
    <TouchableWithoutFeedback onPress={() => onSelectBank() }>
      <View style={styles.container}>
        <CustomText style={styles.card_name} numberOfLines={1}>{props.card.name}</CustomText>
        <CustomText style={styles.card_number} numberOfLines={1}>{props.card.number}</CustomText>
        <View style={styles.info_line} />
      </View>
    </TouchableWithoutFeedback>
    
  );

  function onSelectBank() {
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 78,
  },
  card_name: {
    marginTop: 16,
    width: '100%',
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.alphaWhiteColor50,
  },
  card_number: {
    marginTop: 8,
    width: '100%',
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemWhiteColor,
  },
  info_line: {
    marginTop: 21,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor20,
  },
});
