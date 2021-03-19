import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useState } from 'react';
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
  viewportWidth,
  ZOOM_INTEGRATION_REDIRECT_URL,
  ZOOM_INTEGRATION_URL,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useUsers } from '../../hooks';
import { useGlobalState } from '../../redux/Store';


export const ZoomIntegrationScreen: React.FC = () => {

  const profile = useGlobalState('userInfo');
  const { goBack } = useNavigation();
  const { updateZoomInformation } = useUsers();
  const [ zoomIntegrationUrl, setZoomIntegrationUrl ] = useState<string>('');

  const handleWebViewNavigationStateChange = (newNavState: WebViewNavigation) => {
    if (newNavState.url.length > ZOOM_INTEGRATION_REDIRECT_URL.length && newNavState.url.substring(0, ZOOM_INTEGRATION_REDIRECT_URL.length) == ZOOM_INTEGRATION_REDIRECT_URL) {
      const tokenInfo = newNavState.url.split('?code=');
      if (tokenInfo.length > 1) {
        const token = tokenInfo[1];
        updateZoomInformation(profile.randomString, profile.email, token)
      }
      setZoomIntegrationUrl('');
      Alert.alert('', SUCCESS_MESSAGE.ZOOM_INTEGRATION_SUCCESS);
    }
  }

  return (
    <Container style={{...styles.background, backgroundColor: zoomIntegrationUrl == '' ? COLOR.blackColor : COLOR.systemWhiteColor}}>
      { zoomIntegrationUrl == '' &&
        <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Auth_Background} />
      }

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          { zoomIntegrationUrl == ''
            ? <View style={{width: '100%', height: '100%'}}>
                <CustomText style={styles.title}>Zoom Authorization</CustomText>
                <TouchableWithoutFeedback onPress={() => goBack() }>
                  <View style={styles.back_icon}>
                    <SvgXml width='100%' height='100%' xml={Icon_Back} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            : <TouchableWithoutFeedback onPress={() => setZoomIntegrationUrl('') }>
                <View style={{...styles.back_icon, top: 0, left: 0, height: 33}}>
                  <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
                </View>
              </TouchableWithoutFeedback>
          }
        </View>

        { zoomIntegrationUrl == '' 
          ? <TouchableWithoutFeedback onPress={() => setZoomIntegrationUrl(ZOOM_INTEGRATION_URL)}>
              <View style={styles.saveButton}>
                <ColorButton title={'Connect Your Zoom Account'} backgroundColor={COLOR.systemWhiteColor} color={COLOR.blackColor} />
              </View>
            </TouchableWithoutFeedback>
          : <WebView
              source={{ uri: zoomIntegrationUrl }}
              style={{width: '100%', height: '100%', flex: 1}}
              onNavigationStateChange={handleWebViewNavigationStateChange}
            />
        }
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
  saveButton: {
    position: 'absolute',
    bottom: 60,
    marginLeft: 24,
    marginRight: 24,
    width: viewportWidth - 48,
    height: 44,
  },
});
