import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

// from app
import {
  Icon_Add_Experience_Image, 
  Icon_Add_Experience_Image_Background,
} from '../../constants';
import { IFile } from '../../interfaces/app';

interface props {
  image: IFile;
  showPlusIcon: boolean;
}

export const ExperienceImageView: React.FC<props> = (props: props) => {

  const image: IFile = props.image;
  const showPlusIcon: boolean = props.showPlusIcon;

  return (
    <View style={styles.container}>
      {
        image.uri == null || image.uri == ''
        ? <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <SvgXml width='100%' height='100%' xml={Icon_Add_Experience_Image_Background} />
            {
              showPlusIcon == true
              ? <View style={styles.plus_icon}>
                  <SvgXml width={28} height={26} xml={Icon_Add_Experience_Image} />
                </View>
              : null
            }
          </View>
        : <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri: image.uri}} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: 75, 
    height: 75, 
    borderRadius: 15,
    marginRight: 8,
    overflow: 'hidden',
  },
  plus_icon: {
    position: 'absolute',
    width: 28, 
    height: '100%', 
    marginTop: 21,
    marginLeft: 26.5,
  },
});
