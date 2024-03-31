import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SPACING} from '@app/resources';
import CustomIcon, {ICON_TYPE} from './CustomIcon';

const SearchBarComponent = ({onPress, placeholder}) => {
  return (
    <Pressable
      style={{marginTop: SPACING.SCALE_10, marginLeft: SPACING.SCALE_1}}
      onPress={onPress}>
      <View style={styles.container}>
        <CustomIcon
          style={{
            alignSelf: 'center',
            marginLeft: SPACING.SCALE_10,
            //marginRight: 5,
            //paddingTop: 5,
            // marginLeft: -40,
          }}
          origin={ICON_TYPE.FEATHER_ICONS}
          name={'search'}
          color={'#00000070'}
          size={20}
        />
        <Text style={{marginLeft: SPACING.SCALE_10}}>
          {placeholder ?? 'Search by product/brand/model'}
        </Text>
      </View>
    </Pressable>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: SPACING.SCALE_300,
    height: SPACING.SCALE_44,
    // backgroundColor: 'red',
    //justifyContent: 'center',
    alignItems: 'center',
    borderWidth: SPACING.SCALE_1,
    borderRadius: SPACING.SCALE_10,
  },
});
