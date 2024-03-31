import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SPACING } from '@app/resources';

const styles = StyleSheet.create({
  ImageStyle: {
    height: SPACING.SCALE_72,
    width: SPACING.SCALE_72,
    borderRadius: SPACING.SCALE_72 / SPACING.SCALE_2,
    marginTop: SPACING.SCALE__45,
    marginLeft: SPACING.SCALE__24,
  },
  NameStyle: {
    fontFamily: 'Cabin-Regular',
    fontSize: SPACING.SCALE_20,
    maxWidth: SPACING.SCALE_239,
    textAlign: 'left',
  },
  BadgeStyle: {
    // flexDirection:'row',
    // justifyContent:'space-between',
    alignContent: 'center',
  },
  NameBadgeStyle: {
    flexDirection: 'row',
    //justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  ProfilePicture: {
    flexDirection: 'row',
    marginLeft: 16,
    // backgroundColor: 'red',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  VerificationStyle: {
    fontFamily: 'Cabin-Regular',
  },
  VerificationViewStyle: {
    flexDirection: 'row',
  },
  VerificationViewStyle1: {
    flexDirection: 'row',
    marginTop: SPACING.SCALE_40,
    marginLeft: SPACING.SCALE_28,
  },
  TextStyle1: {
    fontFamily: 'OpenSans-Bold',
    alignSelf: 'center',
    fontSize: SPACING.SCALE_16,
    color: COLORS.HYPERLINK,
    margin: SPACING.SCALE_20,
  },
  NavigationView: {
    flexDirection: 'row',
    width: SPACING.SCALE_320,
    justifyContent: 'space-between',
  },
  NavigationText: {
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: SPACING.SCALE_20,
    fontSize: SPACING.SCALE_14,
    color: '#000000',
    // backgroundColor: 'red'
  },
  NavigationViewInner: {
    flexDirection: 'row',
  },
  NavigationImageStyle: {
    alignSelf: 'center',
  },
  LineView: {
    height: SPACING.SCALE_1,
    width: SPACING.SCALE_330,
    backgroundColor: '#D8D8D8',
    margin: SPACING.SCALE_20,
    alignSelf: 'center',
    //marginLeft: -20,
  },
  NameBadgeLineStyle: {
    height: SPACING.SCALE_1,
    width: '100%',
    backgroundColor: '#D8D8D8',
    margin: SPACING.SCALE_10,
    alignSelf: 'center',
  },
});

export default styles;
