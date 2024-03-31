import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {Pressable} from 'react-native';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {TextInput} from 'react-native-paper';

const FactoryGemRow = ({
  isRequired,
  lable,
  description,
  onTitlePress,
  titleValue,
  onDescriptionPress,
  descriptionValue,
  descriptionData,
  setCustomError,
}) => {
  const [otherText, setOtherText] = useState(null);

  const getSelectedRow = item => {
    const filtered = descriptionValue.filter(dv => dv.id == item.id);
    return filtered.length ? true : false;
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          paddingRight: 40,
        }}>
        <CustomText style={{color: '#7C7C7C'}}>
          {lable}{' '}
          {isRequired ? <CustomText style={{color: 'red'}}>*</CustomText> : ''}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '50%',
            justifyContent: 'space-around',
          }}>
          {['Yes', 'No'].map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '30%',
                }}>
                <Pressable onPress={() => onTitlePress(item)}>
                  <CustomIcon
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name={
                      titleValue === item
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    color={'#00958C'}
                    size={20}
                  />
                </Pressable>
                <Spacer width={10} />
                <CustomText>{item}</CustomText>
              </View>
            );
          })}
        </View>
      </View>
      <CustomText style={{color: '#7C7C7C'}}>{description}</CustomText>
      {titleValue === 'Yes' ? (
        <View
          style={{
            justifyContent: 'center',
            padding: 10,
          }}>
          {descriptionData?.map(item => {
            return (
              <View key={item?.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '30%',
                    padding: 10,
                  }}>
                  <Pressable
                    onPress={() =>
                      onDescriptionPress({
                        item,
                        text: '',
                        type: getSelectedRow(item),
                      })
                    }>
                    <CustomIcon
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      name={
                        getSelectedRow(item)
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      color={'#00958C'}
                      size={20}
                    />
                  </Pressable>
                  <Spacer width={20} />
                  <CustomText>{item?.name}</CustomText>
                </View>
                {getSelectedRow(item) ? (
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      minWidth: '45%',
                    }}
                    value={
                      descriptionValue.find(it => it.id === item.id).text ?? ''
                    }
                    placeholder="Type..."
                    onChangeText={v => {
                      onDescriptionPress({
                        item,
                        text: v,
                      });
                      setCustomError(false);
                    }}
                  />
                ) : (
                  ''
                )}
              </View>
            );
          })}
        </View>
      ) : null}
    </>
  );
};

export default FactoryGemRow;

const styles = StyleSheet.create({});
