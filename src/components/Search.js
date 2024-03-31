import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import {IMAGES} from '../resources';

const Search = ({
  placeholder,
  onChange,
  width,
  onSubmitEditing,

  value,
}) => {
  return (
    <View style={{...styles.container, width: width}}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        onSubmitEditing={onSubmitEditing}
        value={value}
        autoCapitalize="none"
      />
      <Image source={IMAGES.search} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 20,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  img: {
    position: 'absolute',
    marginLeft: 10,
    marginRight: 5,
  },
});

export default Search;
