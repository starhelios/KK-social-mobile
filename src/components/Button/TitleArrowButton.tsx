import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  Icon_Detail_Right_Arrow_Black, 
  Icon_Detail_Right_Arrow_White, 
} from '../../constants';

interface props {
  title: string;
  name: string;
  showArrow: boolean;
  white_color: boolean;
}

export const TitleArrowButton: React.FC<props> = (props: props) => {
  return (
    <View style={styles.container}>
      {
        props.title != ''
        ? <CustomText style={{
            ...styles.title, 
            color: props.white_color == true ? COLOR.systemWhiteColor : COLOR.alphaBlackColor75,
            height: props.white_color == true ? 23 : 18,
            lineHeight: props.white_color == true ? 23 : 18,
            marginBottom: props.white_color == true ? 22 : 16,
            fontFamily: FONT.AN_Regular,
            fontSize: props.white_color == true ? 14 : 12}} numberOfLines={1}>
            {props.title}
          </CustomText>
        : null
      }
      <View style={styles.info}>
        <CustomText 
          style={{...styles.name, color: props.white_color == true ? COLOR.systemWhiteColor : COLOR.blackColor}} 
          numberOfLines={1}>
          {props.name}
        </CustomText>
        <View style={styles.arrow}>
            <SvgXml width='100%' height='100%' xml={props.white_color == true ? Icon_Detail_Right_Arrow_White : Icon_Detail_Right_Arrow_Black} />
        </View>
      </View>
      <View style={{...styles.info_line, backgroundColor: props.white_color ? COLOR.alphaWhiteColor20 : COLOR.alphaBlackColor20}} />
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
    fontWeight: '600',
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
    // fontWeight: '500',
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
