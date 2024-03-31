import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput, CustomText} from '@app/components';
import {showAlert} from '@app/helper/commonFunction';
import {TextInput} from 'react-native-paper';
export const SOCIAL_LINKS = [
  {
    type: 'text',
    id: 0,
    value: '',
  },
];
const SocialMedia = ({socialLinks, setSocialLinks}) => {
  // Add new input field
  const addInput = () => {
    const newArr = socialLinks.map(elem => {
      return Object.assign({}, elem);
    });
    if (newArr.length && newArr[newArr.length - 1].value !== '') {
      setSocialLinks([
        ...newArr,
        {
          id: newArr?.length,
          type: 'text',
          value: '',
        },
      ]);
    } else {
      showAlert({
        title: 'Fill previous social link.',
      });
    }
  };

  return (
    <View
      style={{
        paddingBottom: 10,
        width: '100%',
      }}>
      <Text style={{}}>Social Media Links</Text>
      {socialLinks.map((item, index) => {
        return (
          <TextInput
            style={{
              backgroundColor: '#fff',
              marginBottom: 10,
            }}
            key={index}
            placeholder="Enter links"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={val => {
              const newArr = socialLinks.map(elem => {
                return Object.assign({}, elem);
              });
              newArr[index].value = val;
              setSocialLinks(newArr);
            }}
            value={item.value}
            maxLength={100}
          />
        );
      })}
      <Pressable onPress={addInput}>
        <CustomText
          style={{
            alignSelf: 'flex-end',
            color: '#00958C',
          }}>
          + Add More{' '}
        </CustomText>
      </Pressable>
    </View>
  );
};

export default SocialMedia;

const styles = StyleSheet.create({});
