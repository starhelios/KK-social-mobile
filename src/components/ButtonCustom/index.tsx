import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface IButtonCustom {
  customStyle: any;
  text: string;
}

const ButtonCustom: React.FC<IButtonCustom> = ({ customStyle, text }) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 40,
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 10,
      ...customStyle,
    },
    text: {
      color: 'white',
    },
  });

  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
