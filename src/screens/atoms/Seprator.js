import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Seprator = ({title = 'Or'}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.line}></View>
    </View>
  );
};

export default Seprator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    height: 2,
    width: '40%',
    backgroundColor: '#00000033',
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 17,
    color: '#00958C',
  },
});
