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
import { BankButton, TitleArrowButton } from '../../components/Button';
import { IBank } from '../../interfaces/app';


export const WithdrawalScreen: React.FC = () => {

  const { navigate, goBack } = useNavigation();

  const [bankList, setBankList] = useState<IBank[]>([]);

  useEffect(() => {
    var list: IBank[] = [];
      list.push({name: 'Chase Business Checking', number: 'Bank ** 0023'});
      list.push({name: 'Chase Business Checking', number: 'Bank ** 0024'});
      list.push({name: 'Chase Business Checking', number: 'Bank ** 0025'});
      setBankList(list);
  }, [])

  return (
    <Container style={styles.background}>
      
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Auth_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Withdrawal</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

          <View style={styles.input_container}>
            <View style={{width:'100%'}}>
              <CustomText style={styles.info_title}>Connected Account</CustomText>
              <FlatList
                style={{width: '100%', marginTop: 5, height: bankList.length * 78 <= viewportHeight - 350 ? bankList.length * 78 : viewportHeight - 350 }}
                contentContainerStyle={{paddingVertical: 0}}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                data={bankList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <BankButton card={item} />}
              />
            </View>

            <CustomText style={{...styles.info_title, marginTop: 44}}>Add Account</CustomText>

            <TouchableWithoutFeedback onPress={() => onAddBankAccount() }>
              <View style={{width:'100%', marginTop: 22}}>
                <TitleArrowButton title={''} name={'Add Bank Account'} showArrow={true} white_color={true} />
              </View>
            </TouchableWithoutFeedback>
          </View>
      </SafeAreaView>
    </Container>
  );

  function onAddBankAccount() {
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
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
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
});
