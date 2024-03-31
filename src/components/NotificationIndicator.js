import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const NotificationIndicator = ({icon, hasUnreadNotification, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      {hasUnreadNotification && <View style={styles.notificationDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
});

export default NotificationIndicator;
