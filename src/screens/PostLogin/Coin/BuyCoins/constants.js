import {Platform} from 'react-native';

const productSkus = Platform.select({
  ios: ['com.develop.SWI.300', 'com.develop.500.SWI', 'com.develop.SWI.800'],
  android: ['com.swi300coins', 'com.swi500coins', 'com.swi800coins'],
  default: [],
});

const subcriptionSkus = Platform.select({
  ios: ['com.develop.SWI.monthly'],
  android: [''],
  default: [],
});

const iOS = Platform.OS === 'ios';
const android = Platform.OS === 'android';

export const constants = {
  productSkus,
  iOS,
  android,
  subcriptionSkus,
};
