import { StyleSheet } from 'react-native';
import { FONT, COLOR } from '../constants';

export default StyleSheet.create({
  stretch: {
    width: '100%',
    height: 200,
    resizeMode: 'repeat',
  },
  navigation: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigation_text: {
    fontFamily: FONT.AN_Regular,
    textAlign: 'center',
    fontSize: 10,
    top: -27,
  },
  ar: {
    position: 'relative',
    top: -50,
    borderRadius: 58,
    overflow: 'hidden',
    width: 58,
    height: 58,
  },
  auth_input: {
    marginTop: 0,
    width: '100%',
    height: 45,
    lineHeight: 20,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemWhiteColor,
  },
  auth_line: {
    marginTop: 5,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor20,
  },
});
