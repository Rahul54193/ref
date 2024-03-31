import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';
import {CustomIcon, CustomInput, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {SPACING} from '@app/resources';

const SearchHeader = ({
  onChangeSearch,
  searchQuery,
  showBell,
  onSubmitEditing,
  placeholder,
  value,
}) => {
  return (
    <View
      style={{
        height: SPACING.SCALE_80,

        width: '90%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 1,
        }}>
        <Spacer width={10} />
        <CustomInput
          onSubmitEditing={onSubmitEditing}
          value={value}
          mode={'outlined'}
          outlineColor="grey"
          onChangeText={onChangeSearch}
          style={{
            flex: showBell ? 0.85 : 1,
          }}
          outlineStyle={{
            borderRadius: 10,
          }}
          leftIcon={
            <CustomIcon
              style={{
                alignSelf: 'center',
                paddingTop: 5,
              }}
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'search'}
              color={'#00000070'}
              size={20}
            />
          }
          placeholder={
            placeholder ? placeholder : 'Search by product/brand/model'
          }
        />
        {showBell && (
          <CustomIcon
            style={{
              flex: 0.15,
            }}
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'bell'}
            color={'#000000'}
            size={SPACING.SCALE_30}
          />
        )}
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({});
