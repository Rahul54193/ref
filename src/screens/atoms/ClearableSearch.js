import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {CustomIcon} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';

const ClearableSearch = ({search, setSearch, placeholder, onSubmitEditing}) => {
  return (
    <TextInput
      onSubmitEditing={onSubmitEditing}
      mode="outlined"
      placeholder={placeholder ?? 'Search by product/brand/model'}
      value={search}
      onChangeText={v => setSearch(v)}
      style={{backgroundColor:'white'}}
      activeOutlineColor=""
      outlineStyle={{
        borderRadius: 10,
      }}
      left={
        <TextInput.Icon
          forceTextInputFocus={false}
          icon={() => (
            <CustomIcon
              name={'search'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              size={25}
            />
          )}
        />
      }
      right={
        search.length ? (
          <TextInput.Icon
            forceTextInputFocus={false}
            onPress={() => setSearch('')}
            icon={() => (
              <CustomIcon
                name={'clear'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={25}
              />
            )}
          />
        ) : null
      }
    />
  );
};

export default ClearableSearch;
