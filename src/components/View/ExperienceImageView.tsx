import * as React from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
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
  image: string;
  imageCount: number;
  index: number;
  changeCount: number;
  onSelectPhoto: (index: number) => void;
}

export const ExperienceImageView: React.FC<props> = (props: props) => {

  const image: string = props.image;
  const imageCount: number = props.imageCount;
  const index: number = props.index;

  return (
    <TouchableWithoutFeedback onPress={() => props.onSelectPhoto(index) }>
    <View style={styles.container}>
      {
        image == null || image == '' || image == undefined
        ? <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <SvgXml width='100%' height='100%' xml={Icon_Add_Experience_Image_Background} />
            { index == imageCount && 
                <View style={styles.plus_icon}>
                  <SvgXml width={28} height={26} xml={Icon_Add_Experience_Image} />
                </View>
            }
          </View>
        : <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri: image}} />
      }
    </View>
    </TouchableWithoutFeedback>
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
