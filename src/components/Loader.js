import {AssestsConst} from '@app/assets/assets';
import * as React from 'react';
import {Image} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import FullScreenLoader from './FullScreenLoader';

const Loader = ({size}) => (
  // <ActivityIndicator
  //   animating={true}
  //   color={'#00958C'}
  //   size={size ?? 'large'}
  // />
  <FullScreenLoader status={true} />
);

export default Loader;
