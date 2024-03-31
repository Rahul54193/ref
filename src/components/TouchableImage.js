import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const TouchableImage = ({onPress, source, height, width, tintColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        style={{height, width, tintColor}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default TouchableImage;
