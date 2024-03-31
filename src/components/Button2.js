import * as React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';

// import {COLORS, TYPOGRAPHY} from '../resources';

const Custombutton2 = ({
  onPress,
  marginTop,
  marginBottom,
  width,
  activeOpacity,
  height,
  marginHorizontal,
  backgroundColor,
  title,
  disabled,
  fontFamily,
  fontSize,
  borderColor
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled ?? false}
      style={({pressed}) => [
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
          width: width ?? '100%',
          opacity: pressed ? activeOpacity ?? 0.5 : 1,
        },
      ]}>
      <View
        style={[
          styles.buttonView,
          {
            height: height ?? 50,
            marginHorizontal: marginHorizontal,
            backgroundColor: backgroundColor ?? 'white',
            borderColor: borderColor ?? 'black'
            
            
          },
        ]}>
        <Text style={{ fontSize: fontSize ?? 16,
    color: 'black',
    fontFamily:fontFamily ?? 'Cabin-Bold',
    
    textAlign: 'center',}}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
  },
  // buttonText: {
  //   fontSize: fontSize ?? 16,
  //   color: 'black',
  //   fontFamily:fontFamily ?? 'Cabin-Bold',
    
  //   textAlign: 'center',
  // },
});
export default Custombutton2;
