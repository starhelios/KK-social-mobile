import { StyleSheet } from 'react-native';

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
  navigationText: {
    fontFamily: 'Montserrat-Regular',
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
});
