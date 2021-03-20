import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Back, 
  Img_Lock,
  MARGIN_TOP,
} from '../../constants';
import { YourCardButton } from '../../components/Button';
import { ICardInfo, IUser } from '../../interfaces/app';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { ActionType } from '../../redux/Reducer';
import { usePayments } from '../../hooks';


export const PaymentOptionsScreen: React.FC = () => {

  const userInfo: IUser = useGlobalState('userInfo');
  const selectedCard: ICardInfo = useGlobalState('selectedCard');
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const { deleteCard } = usePayments();
  const [ cardList, setCardList ] = useState<ICardInfo[]>(userInfo.availableMethods);
  const [ isEditing, setIsEditing ] = useState<boolean>(false);

  useEffect(() => {
    let cards: ICardInfo[] = [];
    if (userInfo.availableMethods != undefined && userInfo.availableMethods != null) {
      cards = userInfo.availableMethods.filter((item) => {
        return item.id != ''
      });
    }
    cards.push({id: '', cardBrand: 'Add New Payment', expiryMonth: 0, expiryYear: 0, last4digits: ''});
    setCardList(cards);
  }, [userInfo]);

  const onSelectCard = (card: ICardInfo) => {
    if (card.id == '') {
      navigate('AddPaymentMethod');
    } else {
      dispatch({
        type: ActionType.SET_SELECT_CARD,
        payload: card,
      });
    }
  }

  const onDeleteCard = async (card: ICardInfo) => {
    deleteCard(card.id)
    .then(async (result: Promise<string>) => {
      Alert.alert('', await result);
      const newCardList = userInfo.availableMethods.filter((item) => {
        return item.id !== card.id
      })
      userInfo.availableMethods = newCardList;
      dispatch({
        type: ActionType.SET_USER_INFO,
        payload: userInfo,
      })

      let cards = userInfo.availableMethods.filter((item) => {
        return item.id != ''
      });
      cards.push({id: '', cardBrand: 'Add New Payment', expiryMonth: 0, expiryYear: 0, last4digits: ''});
      setCardList(cards);
    })
    .catch(async (error: Promise<string>) => {
      Alert.alert('', await error);
    })
  }

  return (
    <Container style={styles.background}>

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={{...styles.title, fontWeight: '600'}}>Payment Options</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setIsEditing(!isEditing)}>
            <View style={{...styles.back_icon, right: 24, width: 60}}>
              <CustomText style={{...styles.title, textAlign: 'right', fontSize: 14}}>{isEditing == false ? 'Edit' : 'Done'}</CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.input_container}>
          <FlatList
            style={{width: '100%', marginTop: 5}}
            contentContainerStyle={{paddingVertical: 0}}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={cardList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <YourCardButton card={item} onSelectCard={onSelectCard} onDeleteCard={onDeleteCard} selectedCard={selectedCard} isEdit={isEditing} />}
          />
        </View>

        <View style={styles.bottomContainer}>
         <View style={{flexDirection: 'row'}}>
          <Image style={styles.lockIcon} source={Img_Lock} />
          <CustomText style={styles.bottomDescription}>{'Your information is stored securely.'}</CustomText>
          </View>
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
    marginBottom: 30,
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
  bottomContainer: {
    bottom: 20,
    width: '100%',
    height: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  lockIcon: {
    width: 12,
    height: '100%',
    resizeMode: 'contain',
  },
  bottomDescription: {
    marginLeft: 10,
    height: 20,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    color: COLOR.alphaWhiteColor75,
  },
});
