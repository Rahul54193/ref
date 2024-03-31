import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

const KeyboardAwareView = ({style, children}) => {
  return (
    <KeyboardAvoidingView
      style={style}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareView;
