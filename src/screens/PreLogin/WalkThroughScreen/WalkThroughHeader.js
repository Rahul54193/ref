import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import {CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';

const WalkThroughHeader = ({onSkip, onBack, page}) => {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      {page !== 0 ? (
        <Pressable onPress={onBack}>
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={'keyboard-backspace'}
            color={'black'}
            size={30}
          />
        </Pressable>
      ) : (
        <Spacer />
      )}
      {page !== 2 ? (
        <Pressable onPress={onSkip}>
          <CustomText
            style={{
              color: '#00958C',
              fontSize: 16,
              fontFamily: FontsConst.OpenSans_Bold,
            }}>
            Skip
          </CustomText>
        </Pressable>
      ) : (
        <Spacer />
      )}
    </View>
  );
};

export default WalkThroughHeader;

const styles = StyleSheet.create({});
