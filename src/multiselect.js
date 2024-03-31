import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const DollarTextField = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.dollarSign}>$</Text>
      <TextInput style={styles.input} placeholder="Enter amount" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    //borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dollarSign: {
    fontSize: 18,
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

export default DollarTextField;
