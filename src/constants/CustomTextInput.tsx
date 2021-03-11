import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';

const defaultProps: TextInputProps = {
    allowFontScaling: false
}

export const CustomTextInput: React.FC<TextInputProps> = ({ children, ...props }) => {
    return <TextInput {...{ ...defaultProps, ...props }} autoCorrect={false}>{children}</TextInput>
}
