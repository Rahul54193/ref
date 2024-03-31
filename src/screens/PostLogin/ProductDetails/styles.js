import {View, Text, StyleSheet, PixelRatio} from 'react-native';
import React from 'react';
import {SPACING} from '../../../resources';

export default styles = StyleSheet.create({
  ImageSizeStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120),
    width: PixelRatio.getPixelSizeForLayoutSize(90),
    borderRadius: SPACING.SCALE_10,
  },
  SmallImageStyle: {
    height: 80,
    width: 80,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  SmallImageSizeStyle: {
    marginTop: 20,
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  SpecifiactionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginVertical: 8,
    // backgroundColor: 'red',
  },
  SpecifiactionText1: {
    fontFamily: 'OpenSans-SemiBold',
    flex: 0.5,
    fontSize: 15,
    color: '#868686',
    //  backgroundColor: 'yellow',
  },
  SpecifiactionText2: {
    flex: 0.5,
    fontFamily: 'OpenSans-SemiBold',

    fontSize: 13,
    color: '#454545',
    // backgroundColor: 'green',
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // backgroundColor: 'green',
    alignItems: 'center',
    height: SPACING.SCALE_41,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
