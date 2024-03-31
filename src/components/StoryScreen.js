import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {SPACING} from '../resources';

const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
const StoryScreen = ({style, children, loading, loaderColor, NoPadding}) => {
  return (
    <React.Fragment>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={'#ffffff'}
        translucent={false}
      />
      <SafeAreaView style={[styles.mainContainer, style]}>
        <KeyboardAvoidingView
          style={{
            ...styles.root,
            paddingHorizontal: NoPadding ? 0 : SPACING.SCALE_10,
          }}
          behavior={behavior}
          keyboardVerticalOffset={50}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
      {loading && (
        <ActivityIndicator
          size="large"
          color={loaderColor ?? '#465566'}
          style={styles.loader}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  root: {
    flex: 1,
  },
  bottomBarIos: {
    flex: 0,
    backgroundColor: '#ffffff',
  },
  loader: {
    flex: 1,
    backgroundColor: '#41414166',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default StoryScreen;
