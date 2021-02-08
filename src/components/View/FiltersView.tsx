import * as React from 'react';
import {
  EmitterSubscription,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import RangeSlider from 'rn-range-slider';


// from app
import { 
  COLOR, 
  CustomText, 
  CustomTextInput, 
  FONT,
  GOOGLE_MAP_KEY,
  Icon_Close_Black,
  Icon_Location,
  Icon_Search_Black,
  Icon_Slider_Left,
  Icon_Slider_Right,
  viewportWidth,
} from '../../constants';
import { ColorButton } from '../Button';
import { useGlobalState } from '../../redux/Store';
import GlobalStyle from '../../styles/global';


interface props {
  onFilter: (lowPrice: number, hightPrice: number, location: string) => void;
  onCloseView: (visible: boolean) => void;
}

export const FiltersView: React.FC<props> = (props: props) => {

  const filter = useGlobalState('filter');

  const [searchLocation, setSearchLocation] = useState<string>('');
  const [lowPrice, setLowPrice] = useState<number>(filter.minPrice != null ? filter.minPrice : 0);
  const [highPrice, setHighPrice] = useState<number>(filter.maxPrice != null && filter.maxPrice != 0 ? filter.maxPrice : 1000);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

  const renderThumb = useCallback(() => <SvgXml width={34} height={24} xml={Icon_Slider_Left} />, []);
  const renderRail = useCallback(() => <View style={styles.slider_rail} />, []);
  const renderRailSelected = useCallback(() => <View style={styles.slider_rail_selected} />, []);
  const renderLabel = useCallback(value => renderSliderLabel(value), []);
  const renderNotch = useCallback(() => <View style={styles.slider_notch} />, []);

  var isInit = true;
  var keyboardDidShowListener: EmitterSubscription;
  var keyboardDidHideListener: EmitterSubscription;
  var ref = useRef();
  var googleAddressRef: GooglePlacesAutocompleteRef | null;

  const handleValueChange = useCallback((low, high) => {
    if (isInit == true) {
      isInit = false;
      setLowPrice(filter.minPrice != null ? filter.minPrice : 0);
      setHighPrice(filter.maxPrice != null && filter.maxPrice != 0 ? filter.maxPrice : 1000);
      return;
    }
    setLowPrice(low);
    setHighPrice(high);
  }, []);

  const selectAddress = (address: GooglePlaceData, details: GooglePlaceDetail | null) => {
    setSearchLocation(address.structured_formatting.main_text);
    ref.current?.setAddressText(address.structured_formatting.main_text);
<<<<<<< HEAD
    googleAddressRef?.setAddressText(address.structured_formatting.main_text);
=======
>>>>>>> dddc3523f5ff4950ecc28be81b581262d60bc478
  };

  const keyboardDidShow = () => {
    setShowKeyboard(true);
  }

  const keyboardDidHide = () => {
    setShowKeyboard(false);
  }

<<<<<<< HEAD
=======
  var keyboardDidShowListener: EmitterSubscription;
  var keyboardDidHideListener: EmitterSubscription;
  const ref = useRef();

>>>>>>> dddc3523f5ff4950ecc28be81b581262d60bc478
  useEffect(() => {
    // console.log('mounted');
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
<<<<<<< HEAD

    ref.current?.setAddressText(filter.location);
    googleAddressRef?.setAddressText(filter.location);
=======
>>>>>>> dddc3523f5ff4950ecc28be81b581262d60bc478
  }, []);

  useEffect(() => {
    // console.log('mounted or updated');
<<<<<<< HEAD
=======
    ref.current?.setAddressText(filter.location);
>>>>>>> dddc3523f5ff4950ecc28be81b581262d60bc478
  });

  useEffect(() => {
    return () => {
      // console.log('will unmount');
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }
  }, []);  

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
        <View style = {styles.container} />
      </TouchableWithoutFeedback>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style = {styles.calendar_container}>
          <View style={styles.title_bar}>
            <CustomText style={styles.title}>Filters</CustomText>

            <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
              <View style = {styles.close_icon}>
                <SvgXml width={10} height='100%' xml={Icon_Close_Black} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginLeft: 24, marginRight: 24, width: viewportWidth - 48, marginTop: 0}} />

          <View style={{...styles.content_container, zIndex: 10}}>
            <CustomText style={{...styles.content_title, marginTop: 33}}>Price</CustomText>

            <View style={styles.slider_value_container}>
              <CustomText style={{...styles.slider_value, textAlign: 'left'}}>
                {'$' + lowPrice.toString()}
              </CustomText>
              <CustomText style={{...styles.slider_value, textAlign: 'right', position: 'absolute', right: 0}}>
                {'$' + (highPrice == 1000 ? '1000+' : highPrice.toString())}
              </CustomText>
            </View>

            <RangeSlider
              style={styles.slider}
              min={0}
              max={1000}
              step={10}
              low={lowPrice}
              high={highPrice}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
            />
            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20, marginTop: 22}} />

            <CustomText style={{...styles.content_title, marginTop: 44}}>Location</CustomText>

            <View style={{width:'100%', marginTop: 22, flexDirection: 'row'}}>
              <View style={{position: 'absolute', left: 0, width: 14, height: 13, marginTop: 14}}>
                <SvgXml width='13' height='13' xml={Icon_Search_Black} />
              </View>
<<<<<<< HEAD

              {/* <CustomText style={{...GlobalStyle.auth_input, lineHeight: 45, marginLeft: 25, color: COLOR.blackColor}}>{searchLocation}</CustomText> */}
              <View style={{marginLeft: 15, width: viewportWidth - 80, height: showKeyboard == false ? 45 : (Platform.OS == 'ios' ? 550 : 200)}}>
                <GooglePlacesAutocomplete
                  ref={ref => {
                    ref = ref;
                    googleAddressRef = ref; 
                  }}
                  placeholder='Search Location'
                  onPress={(data, details = null) => {
                    selectAddress(data, details);
=======

              {/* <CustomText style={{...GlobalStyle.auth_input, lineHeight: 45, marginLeft: 25, color: COLOR.blackColor}}>{searchLocation}</CustomText> */}
              <View style={{marginLeft: 15, width: viewportWidth - 80, height: showKeyboard == false ? 45 : 200}}>
                <GooglePlacesAutocomplete
                  ref={ref}
                  placeholder='Search Location'
                  onPress={(data, details = null) => {
                    selectAddress(data, details);

>>>>>>> dddc3523f5ff4950ecc28be81b581262d60bc478
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: COLOR.clearColor,
                    },
                    textInput: {
                      height: 38,
                      color: '#5d5d5d',
                      fontSize: 16,
                      backgroundColor: COLOR.clearColor,
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                  }}
                  query={{
<<<<<<< HEAD
                    key: GOOGLE_MAP_KEY,
=======
                    // key: GOOGLE_MAP_KEY,
>>>>>>> dddc3523f5ff4950ecc28be81b581262d60bc478
                    language: 'en',
                    components: 'country:us',
                  }}
                />
              </View>
              
              <View style={{position: 'absolute', right: 0, width: 14, height: 45}}>
                <SvgXml width='100%' height='100%' xml={Icon_Location} />
              </View>
            </View>

            <View style={{...GlobalStyle.auth_line, backgroundColor: COLOR.alphaBlackColor20}} />
          </View>
          
          { showKeyboard == false &&
            <TouchableWithoutFeedback onPress={() => props.onFilter(lowPrice, highPrice, searchLocation)}>
              <View style={{...styles.bottom_button}}>
                <ColorButton title={'Apply Filters'} backgroundColor={COLOR.systemBlackColor} color={COLOR.systemWhiteColor} />
              </View>
            </TouchableWithoutFeedback>
          }
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  function renderSliderLabel(value: number) {
    <View style={styles.slider_label_container}>
      <CustomText style={styles.slider_label}>{value}</CustomText>
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
    fontWeight: '600',
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
    marginLeft: 24,
    marginRight: 24,
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
    fontWeight: '600',
    fontSize: 16,
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
  },
  slider: {
    marginTop: 12,
    height: 34,
    marginLeft: -5,
    marginRight: -5,
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
