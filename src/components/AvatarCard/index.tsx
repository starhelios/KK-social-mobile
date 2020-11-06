import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface IAvatarCart {
  url: any;
  name: string;
  urlIcon: any;
  job: string;
}

const AvatarCart: React.FC<IAvatarCart> = ({ url, name, urlIcon, job }) => {
  return (
    <View style={styles.container}>
      <Image
        source={url}
        style={{
          width: 164,
        }}
      />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.jobWrap}>
        <Image source={urlIcon} style={styles.iconImage} />
        <Text style={styles.job}>{job} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
  },
  name: {
    color: '#EBEBEB',
    marginTop: 10,
  },
  jobWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconImage: {
    width: 10,
    marginRight: 5,
  },
  job: {
    color: '#C4C4C3',
  },
});

export default AvatarCart;
