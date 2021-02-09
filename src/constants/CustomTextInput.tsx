import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';

const defaultProps: TextInputProps = {
    allowFontScaling: false
}

export const getInnerRef = () => ref;

export const CustomTextInput: React.FC<TextInputProps> = ({ children, ...props }) => {
    return <TextInput ref={(r) => ref = r} {...{ ...defaultProps, ...props }}>{children}</TextInput>
}
