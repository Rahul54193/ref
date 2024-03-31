import * as React from 'react';
import {Text, Pressable, StyleSheet, Image, SafeAreaView} from 'react-native';
import {GLOBAL_STYLES} from 'res';
import {COLORS, FONTS, SPACING, TYPOGRAPHY} from '../resources';

const NavigationBar = ({
  backgroundColor,
  leftAction,
  activeOpacity,
  leftSource,
  title,
  rightAction,
  rightSource,
  flexDirection,
  txtcolor,
  mainStyle,
}) => {
  const pressedStyle = ({pressed}) => [
    {
      width: 12,
      opacity: pressed ? activeOpacity ?? 0.5 : 1,
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.mainView,
        {
          backgroundColor: backgroundColor,
          flexDirection: flexDirection ?? null,
        },
        mainStyle,
      ]}>
      <Pressable onPress={leftAction} hitSlop={30} style={pressedStyle}>
        {leftSource && <Image source={leftSource} style={styles.backButton} />}
      </Pressable>
      <Text
        style={[
          styles.headerText,
          {color: txtcolor ? txtcolor : COLORS.BLACK, fontFamily:'Cabin-SemiBold'},
        ]}>
        {title}
      </Text>
      <Pressable onPress={rightAction} hitSlop={30} style={pressedStyle}>
        {rightSource && (
          <Image source={rightSource} style={styles.rightButton} />
        )}
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: SPACING.SCALE_44,
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  backButton: {
    height: 24,
    resizeMode: 'contain',
  },
  rightButton: {
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: TYPOGRAPHY.FONT_SIZE_18,
    color: COLORS.BLACK,
  },
});

export default NavigationBar;
