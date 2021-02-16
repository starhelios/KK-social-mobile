import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

// from app
import { COLOR, CustomText, FONT } from '../../constants';
import { ICardInfo } from '../../interfaces/app';

interface props {
  card: ICardInfo;
  onSelectCard: (card: ICardInfo) => void;
  onDeleteCard: (card: ICardInfo) => void;
}

export const YourCardButton: React.FC<props> = (props: props) => {

  const card: ICardInfo = props.card;

  return (
    <TouchableWithoutFeedback onPress={() => props.onSelectCard(card)}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <CustomText style={styles.card_number}>{`${card.cardBrand} ${card.last4digits}`}</CustomText>
          <TouchableWithoutFeedback onPress={() => props.onDeleteCard(card)}>
            <CustomText style={styles.delete}>{'Delete'}</CustomText>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.info_line} />
      </View>
    </TouchableWithoutFeedback>
  );
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
    // fontWeight: '500',
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
  delete: {
    position: 'absolute',
    marginTop: 13,
    right: 0,
    width: 80,
    height: 33,
    lineHeight: 33,
    textAlign: 'center',
    backgroundColor: COLOR.redColor,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
  },
});
