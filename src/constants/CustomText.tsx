import * as React from 'react';
import { Text, TextProps } from 'react-native';

const defaultProps: TextProps = {
    allowFontScaling: false
}

export const CustomText: React.FC<TextProps> = ({ children, ...props }) => {
    return <Text {...{ ...defaultProps, ...props }}>{children}</Text>
}
