import React from 'react';
import {View} from 'react-native';

const HorizontalLine = ({height, width, backgroundColor, borderRadius}) => {
  return (
    <View
      style={{
        height: height || 1,
        width: width || '100%',
        backgroundColor: backgroundColor || '#000',
        borderRadius: borderRadius || 0,
      }}
    />
  );
};

export default HorizontalLine;
