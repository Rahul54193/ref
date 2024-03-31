/* eslint-disable react-native/no-inline-styles */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomIcon, { ICON_TYPE } from './CustomIcon';
import CustomText from './CustomText';
import NavigationService from '@app/navigations/NavigationService';

const BackHeader = ({ titleComponent, rightComponent, onPress }) => {
  const _goBack = () => {
    NavigationService.goBack();
  };
  return (
    <View style={styles.rowContainer}>
      <Pressable
        style={{
          height: 50,
          width: 50,
          //backgroundColor: 'red',
          justifyContent: 'center',
        }}
        onPress={onPress ? onPress : _goBack}>
        <CustomIcon
          origin={ICON_TYPE.MATERIAL_ICONS}
          name={'keyboard-backspace'}
          color={'black'}
          size={30}
        />
      </Pressable>
      <>{titleComponent}</>
      <>{rightComponent}</>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  rowContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
