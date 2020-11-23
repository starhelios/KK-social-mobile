import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  FONT, 
  Icon_Back, 
  Icon_Detail_Right_Arrow, 
  Img_Auth_Background,
  MARGIN_TOP,
} from '../../constants';
import { ColorButton, YourCardButton } from '../../components/Button';
import { ICard } from '../../interfaces/app';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const PaymentOptionsScreen: React.FC = () => {

  const { navigate, goBack } = useNavigation();

  const [cardList, setCardList] = useState<ICard[]>([]);

  useEffect(() => {
      var list: ICard[] = [];
      list.push({number: 'Visa 5362'});
      list.push({number: 'Mastercard 4329'});
      setCardList(list);
  }, [])

  return (
    <View style={styles.background}>
      
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Auth_Background}></Image>

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Payment</Text>

          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container} >

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.input_container}>
              <View style={{width:'100%'}}>
                <Text style={styles.info_title}>Your Cards</Text>
                
                <FlatList
                    style={{width: '100%', marginTop: 5, marginBottom: 44, height: cardList.length * 60 <= viewportHeight - 500 ? cardList.length * 60 : viewportHeight - 500 }}
                    contentContainerStyle={{paddingVertical: 0}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                    data={cardList}
                    keyExtractor={item => item.number}
                    renderItem={({item}) => <YourCardButton card={item} />}
                />
              </View>

              <View style={{width:'100%', marginTop: 22}}>
                <Text style={styles.info_title}>Add Card</Text>
                <Text style={styles.info_input}>Add Payment Method</Text>
                <View style={styles.info_right_arrow}>
                    <SvgXml width='100%' height='100%' xml={Icon_Detail_Right_Arrow} />
                </View>
                <View style={styles.info_line} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );

  function onCreateAccount() {
    console.log('create account');
  }
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
    fontFamily: FONT.AN_Bold, 
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
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.systemWhiteColor,
  },
  info_input: {
    marginTop: 15,
    width: '100%',
    height: 35,
    lineHeight: 35,
    fontFamily: FONT.AN_Bold,
    fontSize: 16,
    color: COLOR.systemWhiteColor,
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
    backgroundColor: COLOR.alphaWhiteColor,
  },
});
