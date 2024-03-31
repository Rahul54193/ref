import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';

export const PAYMENT_MODE = [
  {id: 0, type: 'Cash', isEnable: 'false'},
  {id: 1, type: 'Credit Card', isEnable: 'false'},
  {id: 2, type: 'Debit Card', isEnable: 'false'},
  {id: 3, type: 'Installment Plan', isEnable: 'false'},
];
const PaymentMode = ({paymentMode, setPaymentMode}) => {
  return (
    <View
      style={{
        paddingBottom: 10,
        width: '100%',
      }}>
      <Text style={{}}>Choose payment mode available</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        {paymentMode.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingRight: 15,
              }}>
              <Pressable
                onPress={() => {
                  const newArr = paymentMode.map(elem => {
                    return Object.assign({}, elem);
                  });
                  newArr[index].isEnable =
                    newArr[index].isEnable === 'true' ? 'false' : 'true';
                  setPaymentMode(newArr);
                }}>
                <CustomIcon
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  name={
                    item.isEnable === 'true'
                      ? 'check-box'
                      : 'check-box-outline-blank'
                  }
                  color={item.isEnable === 'true' ? '#00958C' : '#868686'}
                  size={20}
                />
              </Pressable>
              <Spacer width={10} />
              <CustomText>{item.type}</CustomText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PaymentMode;

const styles = StyleSheet.create({});
