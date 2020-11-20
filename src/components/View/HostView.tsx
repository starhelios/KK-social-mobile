import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SvgUri, SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  FONT, 
  Img_Avatar_1, 
  Img_Avatar_2, 
} from '../../constants';
import { IHost } from '../../interfaces/app';

interface props {
  host: IHost;
}

export const HostView: React.FC<props> = (props: props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        // source={(props.host.image == null || props.host.image == '') ? Img_Avatar_1 : {uri: props.host.image}}
        // test
        source={props.host.experience == 'Music' || props.host.experience == 'Sports' ? Img_Avatar_1 : Img_Avatar_2}
      />
      <Text style={styles.title}>{props.host.username}</Text>
      <View style={styles.experienceContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {/* {
            props.host.experience_icon != null && props.host.experience_icon != ''
            ? <SvgUri width='100%' height='100%' uri={props.host.experience_icon} />
            : null
          } */}
          {/* // test */}
          <SvgXml height={12} xml={props.host.experience_icon} />
          <Text style={styles.experience}>{props.host.experience}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 154,
    height: 211,
    marginRight: 16,
    flexDirection: 'column',
  },
  image: { 
    width: '100%', 
    height: 154, 
    borderRadius: 77,
  },
  title: {
    width: '100%',
    height: 17,
    lineHeight: 17,
    marginTop: 12,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Bold,
    fontSize: 12,
    textAlign: 'center',
  },
  experienceContainer: {
    marginTop: 6,
    height: 12,
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  experience: {
    height: 12,
    lineHeight: 12,
    marginLeft: 5,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
});
