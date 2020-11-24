import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

// from app
import { COLOR, FONT, Icon_Detail_Right_Arrow } from '../../constants';

interface props {
  title: string;
  name: string;
  showArrow: boolean;
}

export const TitleArrowButton: React.FC<props> = (props: props) => {
  return (
    <View style={styles.container}>
      {
        props.title != ''
        ? <Text style={styles.title}>{props.title}</Text>
        : null
      }
      <View style={styles.info}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.arrow}>
            <SvgXml width='100%' height='100%' xml={Icon_Detail_Right_Arrow} />
        </View>
      </View>
      <View style={styles.info_line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    width: '100%',
    height: 23,
    lineHeight: 23,
    marginBottom: 22,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.systemWhiteColor,
  },
  info: {
    width: '100%',
    height: 16,
    flexDirection: 'row',
  },
  name: {
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemWhiteColor,
  },
  arrow: {
    position: 'absolute',
    width: 5,
    height: 10,
    right: 0,
    top: 3,
  },
  info_line: {
    marginTop: 22,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor20,
  },
});
