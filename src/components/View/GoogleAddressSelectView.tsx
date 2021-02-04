import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

// from app
import { COLOR, GOOGLE_MAP_KEY } from '../../constants';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


interface props {
  onCloseView: (visible: boolean) => void;
  onSelectAddress: (address: GooglePlaceData, details: GooglePlaceDetail | null) => void;
}

export const GoogleAddressSelectView: React.FC<props> = (props: props) => {

  return (
    <TouchableWithoutFeedback onPress={() => props.onCloseView(false)}>
      <View style={styles.container}>
        <View style={styles.addressContainer}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              props.onSelectAddress(data, details);
            }}
            styles={{
              textInputContainer: {
                backgroundColor: 'grey',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            query={{
              key: GOOGLE_MAP_KEY,
              language: 'en',
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%', 
    height: '100%', 
    backgroundColor: COLOR.alphaBlackColor75,
  },
  addressContainer: {
    marginTop: 50,
    flex: 1,
  },
});
