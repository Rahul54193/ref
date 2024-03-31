import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {AssestsConst} from '@app/assets/assets';

const FullScreenLoader = ({status, children}) => {
  return (
    <>
      {children}
      {status && (
        <View style={styles.loading}>
          {/* <ActivityIndicator size="large" /> */}
          <Image
            source={AssestsConst.LOADING}
            style={{height: 50, width: 50}}
          />
        </View>
      )}
    </>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.4,
    backgroundColor: 'white',
  },
});
