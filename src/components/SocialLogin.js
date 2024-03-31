import {SPACING} from '@app/resources';
import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';

const SocialLoginButton = ({iconImage, socialName, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={iconImage} style={styles.icon} />

      <Text style={styles.text}>{socialName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //width: SPACING.SCALE_280,
    //height: SPACING.SCALE_40,
    flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
    borderWidth: SPACING.SCALE_1,
    borderColor: 'gray',
    borderRadius: SPACING.SCALE_8,
    paddingVertical: SPACING.SCALE_8,
    paddingHorizontal: SPACING.SCALE_12,
    marginVertical: SPACING.SCALE_8,
  },
  icon: {
    width: SPACING.SCALE_24,
    height: SPACING.SCALE_24,
    marginRight: SPACING.SCALE_8,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: SPACING.SCALE_16,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    marginLeft: SPACING.SCALE_10,
  },
});

export default SocialLoginButton;
