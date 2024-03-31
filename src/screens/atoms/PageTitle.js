import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';

const PageTitle = ({title, description, titleStyle, descriptionStyle}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        // backgroundColor: 'red',
      }}>
      <CustomText style={[styles.title, titleStyle]}>{title}</CustomText>
      <Spacer />
      <View
        style={{
          height: 3,
          width: 30,
          backgroundColor: '#00958C',
        }}></View>
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  title: {
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 20,
  },
  description: {
    fontFamily: FontsConst.OpenSans_Regular,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
});
