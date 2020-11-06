import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface ICard {
  urlMainImage: ImageSourcePropType;
  urlIcon: ImageSourcePropType;
}

const Card: React.FC<ICard> = ({ urlMainImage, urlIcon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={urlMainImage} style={styles.mainImage} />
      </View>
      <View style={styles.descWrap}>
        <Text style={styles.titleText}>Chef Ramsay Cooking</Text>
        <View style={styles.descTextWrap}>
          <Image source={urlIcon} style={styles.iconImage} />
          <Text style={styles.descText}>Cooking</Text>
          <Text style={styles.descText}>{'\u25CF'}</Text>
          <Text style={styles.descText}>1hr</Text>
        </View>
      </View>
      <View style={styles.bottomWrap}>
        <Text style={styles.titleText}>From $150</Text>
        <Text style={styles.descText}>/ person</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 12,
  },
  imageWrap: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 206,
    width: 164,
  },
  descWrap: {
    paddingTop: 10,
  },
  titleText: {
    color: 'white',
  },
  descTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  descText: {
    marginLeft: 5,
    color: '#B1B1B0',
  },
  bottomWrap: {
    flexDirection: 'row',
  },
  mainImage: {
    width: 155,
  },
  iconImage: {
    width: 10,
  },
});

export default Card;
