import React from 'react';
import {
  CreateAccountScreen,
  ForgetPassword,
  LoginOptions,
  LoginScreen,
  SellScreen,
  SignupScreen,
  TermsandcondtionScreen,
  WalkThroughScreen,
  PostedSuccessfully,
} from '@app/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RoutesName} from '@app/helper/strings';

const Stack = createNativeStackNavigator();

const SellStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={RoutesName.SELL_SCREEN1}>
      <Stack.Screen name={RoutesName.SELL_SCREEN1} component={SellScreen} />
      <Stack.Screen name={RoutesName.SELL_SCREEN2} component={SellScreen} />

      <Stack.Screen
        name={RoutesName.SUCCESS_SCREEN}
        component={PostedSuccessfully}
      />
    </Stack.Navigator>
  );
};

export default SellStackNavigator;
