import { EvilIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';

import SvgComponent from './FilterIcon';

const widthContainer = Dimensions.get('window').width;

const SearchInput = () => {
  const [currentText, setCurrentText] = useState('');

  const onChangeText = (text: string) => {
    setCurrentText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.searchWrap}>
          <View>
            <EvilIcons name="search" size={32} color="#3B3B3B" />
          </View>
          <View>
            <TextInput
              value={currentText}
              style={styles.inputStyle}
              placeholder="Search KloutKast"
              placeholderTextColor="#888888"
              onChangeText={(text) => onChangeText(text)}
            />
          </View>
        </View>

        <TouchableHighlight style={styles.button}>
          <View>
            <SvgComponent />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthContainer,
    paddingHorizontal: 24,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 32,
    marginTop: 10,
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  searchWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  inputStyle: {
    width: 150,
  },
  button: {
    backgroundColor: '#2A2A29',
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 32,
  },
});

export default SearchInput;
