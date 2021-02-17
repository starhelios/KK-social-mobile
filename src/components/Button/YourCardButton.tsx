import * as React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Img_Card_Applepay, 
  Img_Card_Default, 
  Img_Card_Discover, 
  Img_Card_Elo, 
  Img_Card_Express, 
  Img_Card_Google, 
  Img_Card_Hipercard, 
  Img_Card_Mastercard, 
  Img_Card_Paypal, 
  Img_Card_Unionpay, 
  Img_Card_Verve, 
  Img_Card_Visa, 
  Img_Option_Off, 
  Img_Option_On, 
  Img_Plus_Card, 
} from '../../constants';
import { ICardInfo } from '../../interfaces/app';

interface props {
  card: ICardInfo;
  isEdit: boolean;
  selectedCard: ICardInfo;
  onSelectCard: (card: ICardInfo) => void;
  onDeleteCard: (card: ICardInfo) => void;
}

export const YourCardButton: React.FC<props> = (props: props) => {

  const card: ICardInfo = props.card;
  const selectedCard: ICardInfo = props.selectedCard;
  const isEdit: boolean = props.isEdit;

  const getCardImage = (cardType: string) => {
    if (cardType == 'visa') { return Img_Card_Visa }
    else if (cardType == 'apple') { return Img_Card_Applepay }
    else if (cardType == 'discover') { return Img_Card_Discover }
    else if (cardType == 'elo') { return Img_Card_Elo }
    else if (cardType == 'express') { return Img_Card_Express }
    else if (cardType == 'google') { return Img_Card_Google }
    else if (cardType == 'hipercard') { return Img_Card_Hipercard }
    else if (cardType == 'mastercard') { return Img_Card_Mastercard }
    else if (cardType == 'paypal') { return Img_Card_Paypal }
    else if (cardType == 'unionpay') { return Img_Card_Unionpay }
    else if (cardType == 'verve') { return Img_Card_Verve }
    else { return Img_Card_Default }
  }

  return (
    <TouchableWithoutFeedback onPress={() => props.onSelectCard(card)}>
      <View style={styles.container}>
        { card.id != '' 
          ? <View style={styles.cardInfoContainer}>
              <Image style={styles.cardIcon} source={getCardImage(card.cardBrand)} />
              <CustomText style={styles.card_number}>{`${card.cardBrand} ${card.last4digits}`}</CustomText>
                  
                { isEdit == true
                  ? <TouchableWithoutFeedback onPress={() => props.onDeleteCard(card)}>
                      <CustomText style={styles.delete}>{'Delete'}</CustomText>
                    </TouchableWithoutFeedback>
                  : <Image style={styles.option} source={selectedCard.id == card.id ? Img_Option_On : Img_Option_Off} />
                }
            </View>
          : <View style={styles.cardInfoContainer}>
              <Image style={styles.cardIcon} source={Img_Plus_Card} />
              <CustomText style={styles.card_number}>{`${card.cardBrand} ${card.last4digits}`}</CustomText>
            </View>
          }
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
  cardInfoContainer: {
    marginTop: 20,
    width: '100%',
    height: 30,
    flexDirection: 'row',
  },
  cardIcon: {
    width: 48,
    height: '100%',
    resizeMode: 'contain',
    borderColor: COLOR.alphaBlackColor20,
    borderWidth: 1,
    borderRadius: 5,
  },
  card_number: {
    marginLeft: 10,
    width: '100%',
    height: 30,
    lineHeight: 30,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.blackColor,
  },
  info_line: {
    marginTop: 10,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaBlackColor20,
  },
  option: {
    position: 'absolute',
    right: 0,
    width: 20,
    height: 30,
    resizeMode: 'contain',
  },
  delete: {
    position: 'absolute',
    right: 0,
    width: 80,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
    backgroundColor: COLOR.redColor,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
  },
});
