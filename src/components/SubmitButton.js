import {StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {FONTS} from '@app/resources';
import {FontsConst} from '@app/assets/assets';

const SubmitButton = ({
  type = 'custom',
  mode = 'contained',
  buttonColor = 'black',
  textColor = 'white',
  onPress = () => {},
  lable = 'Submit',
  labelStyle,
  buttonStyle,
  loading = false,
  disabled = false,
  ...props
}) => {
  switch (type) {
    case 'contained':
      return (
        <Button
          disabled={disabled}
          loading={loading}
          mode="contained"
          buttonColor="black"
          textColor="white"
          labelStyle={[styles.labelStyle, labelStyle]}
          style={[styles.buttonStyle, buttonStyle]}
          onPress={onPress}
          {...props}>
          {lable}
        </Button>
      );
    case 'outlined':
      return (
        <Button
          disabled={disabled}
          mode={'outlined'}
          loading={loading}
          buttonColor={'transparent'}
          textColor={'black'}
          labelStyle={[styles.labelStyle, labelStyle]}
          style={[styles.buttonStyle, buttonStyle]}
          onPress={onPress}
          {...props}>
          {lable}
        </Button>
      );
    default:
      return (
        <Button
          disabled={disabled}
          mode={mode}
          loading={loading}
          buttonColor={buttonColor}
          textColor={textColor}
          labelStyle={[styles.labelStyle, labelStyle]}
          style={[styles.buttonStyle, buttonStyle]}
          onPress={onPress}
          {...props}>
          {lable}
        </Button>
      );
  }
};

export default SubmitButton;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    fontFamily: FontsConst.Cabin_Bold,
  },
  buttonStyle: {
    borderColor: 'black',
    height: 50,
    justifyContent: 'center',
    // marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
});
