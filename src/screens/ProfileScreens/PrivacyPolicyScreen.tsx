import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { WebView } from 'react-native-webview';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Back, 
  MARGIN_TOP,
} from '../../constants';
import { useGlobalState } from '../../redux/Store';


export const PrivacyPolicyScreen: React.FC = () => {

  const profile = useGlobalState('userInfo');

  const { goBack } = useNavigation();

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <CustomText style={styles.title}>Privacy Policy</CustomText>
          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{width: '100%', height: '100%', flex: 1, marginTop: 0, backgroundColor: COLOR.systemWhiteColor}}>
          <WebView
            source={
              Platform.OS === 'android' ? { html: require('../../assets/html/privacy_policy.js')() } : '../../assets/html/privacy_policy.html'
            }
            domStorageEnabled={true}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccessFromFileURLs={true}
            mixedContentMode="always"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{marginLeft: 15, marginRight: 15, height: '100%', backgroundColor: COLOR.systemWhiteColor}}
          />
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
    zIndex: 10,
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
});
