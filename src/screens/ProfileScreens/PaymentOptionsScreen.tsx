import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import stripe from 'tipsi-stripe'

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Back, 
  Img_Auth_Background,
  MARGIN_TOP,
  viewportHeight,
} from '../../constants';
import { TitleArrowButton, YourCardButton } from '../../components/Button';
import { ICardInfo, IUser } from '../../interfaces/app';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { ActionType } from '../../redux/Reducer';


export const PaymentOptionsScreen: React.FC = ({route}) => {

  const userInfo: IUser = useGlobalState('userInfo');

  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();

  const [cardList, setCardList] = useState<ICardInfo[]>(userInfo.availableMethods);

  useEffect(() => {
    setCardList(userInfo.availableMethods);
  }, [userInfo]);

  const onSelectCard = (card: ICardInfo) => {
    dispatch({
      type: ActionType.SET_SELECT_CARD,
      payload: card,
    });
    goBack();
  }

  const onAddPaymentMethod = async () => {
    navigate('AddPaymentMethod');
    // const paymentMethod = await stripe.paymentRequestWithCardForm();
    // console.log(paymentMethod);
  }

  return (
    <Container style={styles.background}>
      
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Auth_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Payment</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.input_container}>
          { cardList.length > 0 &&
            <View>
              <CustomText style={styles.info_title}>Your Cards</CustomText>
          
              <FlatList
                  style={{width: '100%', marginTop: 5, height: cardList.length * 60 <= viewportHeight - 350 ? cardList.length * 60 : viewportHeight - 350 }}
                  contentContainerStyle={{paddingVertical: 0}}
                  showsHorizontalScrollIndicator={false}
                  horizontal={false}
                  data={cardList}
                  bounces={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <YourCardButton card={item} onSelectCard={onSelectCard} />}
              />
            </View>
          }

          <CustomText style={{...styles.info_title, marginTop: 44}}>Add Card</CustomText>

          <TouchableWithoutFeedback onPress={onAddPaymentMethod}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Add Payment Method'} showArrow={true} white_color={true} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    flex: 1, 
    backgroundColor: COLOR.blackColor, 
    alignItems: 'center',
  },
  safe_area: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  navigation_bar: {
    marginTop: MARGIN_TOP,
    width: '100%',
    height: 33,
    flexDirection: 'row',
  },
  title: {
    width: '100%',
    height: 33, 
    lineHeight: 33,
    fontWeight: '600',
    fontFamily: FONT.AN_Regular, 
    fontSize: 24, 
    textAlign: 'center',
    color: COLOR.systemWhiteColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  input_container: {
    marginLeft: 24, 
    marginRight: 24, 
    marginTop: 35, 
    flexDirection: 'column',
    flex: 1,
  },
  info_title: {
    width: '100%',
    height: 23,
    lineHeight: 23,
    fontWeight: '600',
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    color: COLOR.alphaWhiteColor75,
  },
  info_right_arrow: {
    position: 'absolute',
    width: 5,
    height: 10,
    right: 0,
    top: 50,
  },
  info_line: {
    marginTop: 15,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor20,
  },
});
