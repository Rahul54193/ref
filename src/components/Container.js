import React from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import FullScreenLoader from './FullScreenLoader';

const isIos = Platform.OS === 'ios';

const Container = ({children, useSafeAreaView, loading, style, ...other}) => {
  const Element = useSafeAreaView && isIos ? SafeAreaView : View;
  return (
    <FullScreenLoader status={loading}>
      <Element
        style={[{flex: 1, width: '100%', backgroundColor: '#fff'}, style]}
        {...other}>
        {children}
      </Element>
    </FullScreenLoader>
  );
};

export default Container;
