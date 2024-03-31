import {View, Text, StyleSheet, PixelRatio} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '@app/resources';

export default styles = StyleSheet.create({
  CoinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.SCALE_40,
  },
  ImageBackgroudContainer: {
    height: SPACING.SCALE_100,
    width: SPACING.SCALE_100,
  },

  TextContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.SCALE_40,
    marginHorizontal: 20,
  },
  TopText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 24,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  TextStyle1: {
    color: COLORS.HYPERLINK,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    margin: 10,
  },
  cardStyle: {
    // backgroundColor: 'red',
    backgroundColor: '#F5F5F5',
    height: 50,
    width: 307,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  innerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.BLACK,
  },
  outerText: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  NumberStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    marginRight: 10,
    marginTop: -5,
    color: COLORS.BLACK,
  },
  CardCoinStyle: {
    flexDirection: 'row',
    marginTop: 5,
  },
  highlightedLine: {
    backgroundColor: '#F5F5F5',
    height: 50,
    width: 307,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.HYPERLINK,
  },
});
