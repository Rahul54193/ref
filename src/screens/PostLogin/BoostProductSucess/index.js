/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Container, Spacer} from '@app/components';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import {useEffect} from 'react';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';

const BoostProductSuccess = props => {
  console.log(props?.route?.params?.from, '====from=====');
  useEffect(() => {
    setTimeout(() => {
      if (props?.route?.params?.from === 'coin history') {
        props?.navigation?.navigate(RoutesName.COIN_HISTORY);
      } else {
        NavigationService.navigateAndReset(RoutesName.MAIN_TAB_NAVIGATOR);
      }
    }, 500);
  }, []);
  return (
    <Container
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.imageSizeStyle}>
        <Image source={IMAGES.check1} style={styles.imageStyle} />
      </View>
      <Spacer height={SPACING.SCALE_20} />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: COLORS.BLACK,
        }}>
        {props?.route?.params?.from === 'coin history'
          ? 'Successfully purchased'
          : 'Your post has been'}
      </Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: COLORS.BLACK,
        }}>
        {props?.route?.params?.from === 'coin history'
          ? 'coins.'
          : 'successfully boosted.'}
      </Text>
    </Container>
  );
};

export default BoostProductSuccess;

const styles = StyleSheet.create({
  imageSizeStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    //marginTop: 80,
  },
  imageStyle: {
    height: 75,
    width: 75,
    borderRadius: SPACING.SCALE_10,
  },
});
