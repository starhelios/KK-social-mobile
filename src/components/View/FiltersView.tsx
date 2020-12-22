import * as React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import RangeSlider from 'rn-range-slider';

// from app
import { 
  COLOR, 
  FONT,
  Icon_Close_Black,
  Icon_Location,
  Icon_Search_Black,
  Icon_Slider_Left,
  Icon_Slider_Right,
} from '../../constants';
import { ColorButton } from '../Button';
import { useGlobalState } from '../../redux/Store';
import GlobalStyle from '../../styles/global';


interface props {
  onFilter: (lowPrice: number, hightPrice: number) => void;
  onCloseView: (visible: boolean) => void;
}

const { width: viewportWidth } = Dimensions.get('window');

export const FiltersView: React.FC<props> = (props: props) => {

  const filter = useGlobalState('filter');

  const [searchLocation, setSearchLocation] = useState<string>('');
  const [lowPrice, setLowPrice] = useState<number>(filter.minPrice != null ? filter.minPrice : 0);
  const [highPrice, setHighPrice] = useState<number>(filter.maxPrice != null ? filter.maxPrice : 1000);

  const renderThumb = useCallback(() => <SvgXml width={34} height={24} xml={Icon_Slider_Left} />, []);
  const renderRail = useCallback(() => <View style={styles.slider_rail} />, []);
  const renderRailSelected = useCallback(() => <View style={styles.slider_rail_selected} />, []);
  const renderLabel = useCallback(value => renderSliderLabel(value), []);
  const renderNotch = useCallback(() => <View style={styles.slider_notch} />, []);
  const handleValueChange = useCallback((low, high) => {
    setLowPrice(low);
    setHighPrice(high);
  }, []);

  useEffect(() => {
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
        <View style = {styles.container} />
      </TouchableWithoutFeedback>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style = {styles.calendar_container}>
          <View style={styles.title_bar}>
            <Text style={styles.title}>Filters</Text>

            <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
              <View style = {styles.close_icon}>
                <SvgXml width={10} height='100%' xml={Icon_Close_Black} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginLeft: 24, marginRight: 24, width: viewportWidth - 48, marginTop: 0}} />
          
          {/* <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} > */}
            <View style={styles.content_container}>
              <Text style={{...styles.content_title, marginTop: 33}}>Price</Text>

              <View style={styles.slider_value_container}>
                <Text style={{...styles.slider_value, textAlign: 'left'}}>{'$' + lowPrice.toString()}</Text>
                <Text style={{...styles.slider_value, textAlign: 'right', position: 'absolute', right: 0,}}>{'$' + (highPrice == 1000 ? '1000+' : highPrice.toString())}</Text>
              </View>

              <RangeSlider
                style={styles.slider}
                min={0}
                max={1000}
                step={50}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChange}
              />
              {/* <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

              <Text style={{...styles.content_title, marginTop: 44}}>Location</Text>

              <View style={{width:'100%', marginTop: 22, flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={() => onSearchLocation()}>
                  <View style={{position: 'absolute', left: 0, width: 14, height: 45}}>
                    <SvgXml width='100%' height='100%' xml={Icon_Search_Black} />
                  </View>
                </TouchableWithoutFeedback>

                <TextInput
                  style={{...GlobalStyle.auth_input, paddingLeft: 25, color: COLOR.systemBlackColor}}
                  placeholder={'Search Location'}
                  placeholderTextColor={COLOR.alphaBlackColor75}
                  onChangeText={text => setSearchLocation(text)}
                  value={searchLocation}
                />
                
                <TouchableWithoutFeedback onPress={() => onSelectLocation()}>
                  <View style={{position: 'absolute', right: 0, width: 14, height: 45}}>
                    <SvgXml width='100%' height='100%' xml={Icon_Location} />
                  </View>
                </TouchableWithoutFeedback>
                
              </View>

              <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 0}} />
              <Text style={styles.content_text}>New Orleans, LA</Text>
              <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />
              <Text style={styles.content_text}>Nashville, TN</Text>
              <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />
              <Text style={styles.content_text}>New York, NY</Text> */}

            </View>
          {/* </KeyboardAvoidingView> */}

          <TouchableWithoutFeedback onPress={() => props.onFilter(lowPrice, highPrice)}>
            <View style={styles.bottom_button}>
              <ColorButton title={'Apply Filters'} backgroundColor={COLOR.systemBlackColor} color={COLOR.systemWhiteColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  function onSearchLocation() {
    
  }

  function onSelectLocation() {

  }

  function renderSliderLabel(value: number) {
    <View style={styles.slider_label_container}>
      <Text style={styles.slider_label}>{value}</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.alphaBlackColor50,
    flex: 1,
  },
  calendar_container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOR.whiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  title_bar: {
    height: 60,
    width: '100%',
  },
  title: {
    width: '100%',
    lineHeight: 60,
    fontFamily: FONT.AN_Regular,
    color: COLOR.systemBlackColor,
    fontSize: 16,
    textAlign: 'center',
  },
  close_icon: {
    position: 'absolute',
    width: 34,
    height: '100%',
    right: 10,
    alignItems: 'center',
  },
  content_container: {
    marginLeft: 0,
    marginRight: 0,
  },
  bottom_button: {
    marginTop: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    marginBottom: 33,
  },
  content_title: {
    lineHeight: 16,
    height: 16,
    fontFamily: FONT.AN_Regular,
    color: COLOR.systemBlackColor,
    fontSize: 16,
    marginLeft: 24,
    marginRight: 24,
  },
  slider_value_container: {
    marginTop: 22,
    height: 14,
    flexDirection: 'row',
    width: '100%',
  },
  slider_value: {
    lineHeight: 14,
    height: 14,
    fontFamily: FONT.AN_Regular,
    color: COLOR.blackColor,
    fontSize: 14,
    marginLeft: 24,
    marginRight: 24,
  },
  slider: {
    marginTop: 12,
    height: 34,
    marginLeft: 18,
    marginRight: 18,
  },
  content_text: {
    marginTop: 22,
    lineHeight: 14,
    height: 14,
    fontFamily: FONT.AN_Regular,
    color: COLOR.blackColor,
    fontSize: 14,
  },
  slider_rail: {
    flex: 1, 
    height: 2, 
    borderRadius: 1, 
    backgroundColor: COLOR.alphaBlackColor20,
  },
  slider_rail_selected: {
    height: 4, 
    backgroundColor: COLOR.blueColor, 
    borderRadius: 2,
  },
  slider_notch: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  slider_label_container: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  slider_label: {
    lineHeight: 14,
    height: 14,
    fontFamily: FONT.AN_Regular,
    color: COLOR.blackColor,
    fontSize: 14,
  },
});
