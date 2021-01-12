import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { IColorText } from '../../interfaces/app';

// from app
import { COLOR, CustomText, FONT } from '../../constants';

interface props {
  colorTexts: IColorText[];
}

export const ContinueText: React.FC<props> = (props: props) => {
  return (
    <View style={styles.container}>
      {
        props.colorTexts.map(colorText =>
          <CustomText 
            key={colorText.title}
            style={{
              ...styles.title,
              fontFamily: colorText.fontFamily,
              fontSize: colorText.fontSize,
              color: colorText.color}}>
              {colorText.title}
          </CustomText>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: COLOR.clearColor,
    flexDirection: 'row',
  },
  title: {
    height: '100%',
    fontFamily: FONT.AN_Bold,
    color: COLOR.whiteColor,
    fontSize: 14,
  },
});
