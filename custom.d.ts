declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

// declare module '*.png'
declare module '*.jpg'

declare module 'react-native-user-defaults';
declare module 'rn-range-slider';
declare module 'react-native-image-base64';
