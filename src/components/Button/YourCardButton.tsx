import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// from app
import { COLOR, FONT } from '../../constants';
import { ICard } from '../../interfaces/app';

interface props {
  card: ICard;
}

export const YourCardButton: React.FC<props> = (props: props) => {
  return (
    <TouchableWithoutFeedback onPress={() => onSelectCard() }>
      <View style={styles.container}>
        <Text style={styles.card_number}>{props.card.number}</Text>
        <View style={styles.info_line} />
      </View>
    </TouchableWithoutFeedback>
    
  );

  function onSelectCard() {
    console.log("select card : " + props.card.number);
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
  },
  card_number: {
    marginTop: 22,
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
