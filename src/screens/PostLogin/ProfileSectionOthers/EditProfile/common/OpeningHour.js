import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomIcon, CustomInput, CustomText} from '@app/components';
import {Switch} from 'react-native-paper';
import {ICON_TYPE} from '@app/components/CustomIcon';

export const OPENING_HOUR = [
  {lable: 'Monday', isEnable: 'false', text: ''},
  {lable: 'Tuesday', isEnable: 'false', text: ''},
  {lable: 'Wednesday', isEnable: 'false', text: ''},
  {lable: 'Thursday', isEnable: 'false', text: ''},
  {lable: 'Friday', isEnable: 'false', text: ''},
  {lable: 'Saturday', isEnable: 'false', text: ''},
  {lable: 'Sunday', isEnable: 'false', text: ''},
];
const OpeningHour = ({openingHours, setOpeningHours}) => {
  return (
    <View
      style={{
        paddingBottom: 10,
        width: '100%',
      }}>
      <Text style={{}}>Set Opening Hours</Text>
      {openingHours.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
            }}>
            <View
              style={{
                width: '35%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomText>{item?.lable}</CustomText>
              <Pressable
                onPress={() => {
                  const updated = () => {
                    const newArr = openingHours.map(elem => {
                      return Object.assign({}, elem);
                    });
                    newArr[index].isEnable =
                      newArr[index].isEnable === 'true' ? 'false' : 'true';
                    if (newArr[index].isEnable === 'false') {
                      newArr[index].text = '';
                    }
                    return newArr;
                  };

                  setOpeningHours(updated());
                }}>
                <CustomIcon
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  name={item?.isEnable === 'true' ? 'toggle-on' : 'toggle-off'}
                  color={item?.isEnable === 'true' ? '#00958C' : '#868686'}
                  size={30}
                />
              </Pressable>
            </View>
            <View
              style={{
                width: '60%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomInput
                style={{
                  height: 30,
                  width: '100%',
                }}
                placeholder="--"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={val => {
                  const updated = () => {
                    const newArr = openingHours.map(elem => {
                      return Object.assign({}, elem);
                    });
                    newArr[index].text = val;
                    return newArr;
                  };
                  setOpeningHours(updated());
                }}
                value={item?.text}
                editable={item?.isEnable === 'true'}
                maxLength={20}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default OpeningHour;

const styles = StyleSheet.create({});
