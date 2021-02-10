import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

let creditCardType = require("credit-card-type");

// from app
import { 
  CheckCardExpirationDate,
  COLOR, 
  CustomText, 
  CustomTextInput, 
  ERROR_MESSAGE, 
  FONT, 
  GetCardExpirationMonth, 
  GetCardExpirationYear, 
  Icon_Back,
  MARGIN_TOP,
  SUCCESS_MESSAGE,
  viewportWidth,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useGlobalState } from '../../redux/Store';
import { IUser } from '../../interfaces/app';
import { useAuthentication, usePayments, useUsers } from '../../hooks';
import GlobalStyle from '../../styles/global';


export const AddBankAccountScreen: React.FC = () => {

  const userInfo: IUser = useGlobalState('userInfo');
  let fetching = false;

  const { goBack } = useNavigation();
  const { getUserInformation } = useUsers();
  const { setLoginUser } = useAuthentication();
  const { addCard } = usePayments();

  const [accountType, setAccountType] = useState<string>('');
  const [holderName, setHolderName] = useState<string>('');
  const [routingNumber, setRoutingNumber] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');

  const loadUserInfo = async () => {
    await getUserInformation(userInfo.id)
    .then(async (result: Promise<IUser>) => {
      setLoginUser(await result);
    })
  }

  const onSaveAccount = () => {
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Bank Account</CustomText>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{flex: 1}}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
            <ScrollView bounces={false}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                  <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48}}>
                    <View style={{width:'100%', marginTop: 33}}>
                      <CustomText style={styles.info_title}>Account Type</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'Account Type'}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setAccountType(text)}
                        value={accountType}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>
                  </View>

                  <View style={{marginLeft: 24, marginRight: 24, width: viewportWidth - 48}}>
                    <View style={{width:'100%', marginTop: 33}}>
                      <CustomText style={styles.info_title}>Holder Name</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'Holder Name'}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setHolderName(text)}
                        value={holderName}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>Routing Number</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'Routing Number'}
                        keyboardType={'number-pad'}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setRoutingNumber(text)}
                        value={routingNumber}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>

                    <View style={{width:'100%', marginTop: 22}}>
                      <CustomText style={styles.info_title}>Account Number</CustomText>
                      <CustomTextInput
                        style={GlobalStyle.auth_input}
                        placeholder={'Account Number'}
                        keyboardType={'number-pad'}
                        placeholderTextColor={COLOR.alphaWhiteColor50}
                        onChangeText={text => setAccountNumber(text)}
                        value={accountNumber}
                      />
                      <View style={GlobalStyle.auth_line} />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        <View style={styles.bottomContainer}>
          <CustomText style={styles.bottomDescription}>Your earning will be deposited directly into your account.</CustomText>

          <TouchableWithoutFeedback onPress={onSaveAccount}>
            <View style={styles.bottom_button}>
              <ColorButton title={'Save Account'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
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
    fontFamily: FONT.AN_Regular,
    fontWeight: '600' ,
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
  info_title: {
    width: '100%',
    height: 23,
    lineHeight: 23,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    fontWeight: '600',
    color: COLOR.alphaWhiteColor75,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 30,
  },
  bottomDescription: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 20,
    lineHeight: 23,
    fontFamily: FONT.AN_Regular,
    textAlign: 'center',
    fontSize: 12,
    color: COLOR.alphaWhiteColor75,
  },
  bottom_button: {
    marginLeft: 48,
    marginRight: 48,
    marginBottom: 30,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
});
