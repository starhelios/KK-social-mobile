import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { WebView, WebViewNavigation } from 'react-native-webview';

// from app
import { 
  COLOR, 
  FONT, 
  Icon_Back, 
  MARGIN_TOP,
} from '../../constants';


export const JoinBookingScreen: React.FC = ({route}) => {

  const zoomUrl = route.params.zoomUrl;
  const { goBack } = useNavigation();

  const handleWebViewNavigationStateChange = (newNavState: WebViewNavigation) => {
    if (newNavState.url.includes('https://kloutkast.herokuapp.com') == true) {
    }
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <TouchableWithoutFeedback onPress={() => goBack() }>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <WebView
          source={{ uri: zoomUrl }}
          style={{width: '100%', height: '100%', flex: 1, position: 'absolute', marginTop: 0}}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    flex: 1, 
    backgroundColor: COLOR.systemWhiteColor, 
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
