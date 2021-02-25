import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { WebView, WebViewNavigation } from 'react-native-webview';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Back, 
  Icon_Back_Black, 
  Img_Auth_Background,
  MARGIN_TOP,
  SUCCESS_MESSAGE,
  viewportHeight,
  viewportWidth,
} from '../../constants';
import { BankButton, ColorButton, TitleArrowButton } from '../../components/Button';
import { IBank } from '../../interfaces/app';
import { usePayments } from '../../hooks';
import { useGlobalState } from '../../redux/Store';


export const WithdrawalScreen: React.FC = () => {

  let fetching = false;
  const userInfo = useGlobalState('userInfo');
  const { navigate, goBack } = useNavigation();
  const { generateAccountLink } = usePayments();

  const [bankList, setBankList] = useState<IBank[]>([]);
  const [stripeUrl, setStripeUrl] = useState<string>('');
  const [isSettedWithdraw, setIsSettedWithdraw] = useState<boolean>(userInfo.stripeCustomerID == undefined || userInfo.stripeCustomerID == '' ? false : true);

  useEffect(() => {
    let list: IBank[] = [];
      setBankList(list);
  }, [])

  const onAddBankAccount = () => {
    navigate('AddBankAccount');
  }

  const onSaveAccount = async () => {
    if (fetching == true) {
      return;
    }

    fetching = true;
    await generateAccountLink()
    .then(async (url: Promise<string>) => {
      fetching = false;
      const supported = await Linking.canOpenURL(await url);
      if (supported) {
        setStripeUrl(await url);
      }
    })
    .catch(() => {
      fetching = false;
    })
  }

  const handleWebViewNavigationStateChange = (newNavState: WebViewNavigation) => {
    if (newNavState.url.includes('https://kloutkast.herokuapp.com') == true) {
      setStripeUrl('');
      setIsSettedWithdraw(true);
      Alert.alert('', SUCCESS_MESSAGE.ADD_BANK_ACCOUNT_SUCCESS);
    }
  }

  return (
    <Container style={styles.background}>
      { stripeUrl != ''
        ? <View style={{width: '100%', height: '100%', flex: 1}}>
            <WebView
              source={{ uri: stripeUrl }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
            />

            <View style={{position: 'absolute'}}>
              <View style={{...styles.navigation_bar}}>
                <TouchableWithoutFeedback onPress={() => setStripeUrl('') }>
                  <View style={{...styles.back_icon, top: MARGIN_TOP + 30, left: 0, height: 33}}>
                    <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        : <View style={{width: '100%', height: '100%', flex: 1}}>
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
      
              {/* <View style={styles.input_container}>
                { bankList.length > 0 && 
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
                }
      
                <CustomText style={{...styles.info_title, marginTop: 44}}>Add Account</CustomText>
      
                <TouchableWithoutFeedback onPress={() => onAddBankAccount() }>
                  <View style={{width:'100%', marginTop: 22}}>
                    <TitleArrowButton title={''} name={'Add Bank Account'} showArrow={true} white_color={true} />
                  </View>
                </TouchableWithoutFeedback>
              </View> */}
              <TouchableWithoutFeedback onPress={onSaveAccount}>
                  <View style={styles.saveButton}>
                    <ColorButton 
                      title={isSettedWithdraw == false ? 'Finish Account Setup For Withdrawal' : 'Change Stripe Account'} 
                      backgroundColor={COLOR.systemWhiteColor} color={COLOR.blackColor} 
                    />
                  </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
          </View> 
      }
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
  saveButton: {
    position: 'absolute',
    bottom: 60,
    marginLeft: 24,
    marginRight: 24,
    // marginTop: 150,
    width: viewportWidth - 48,
    height: 44,
  },
});
