import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Pagination = ({currentPage}) => {
  return (
    <View style={styles.dotContainer}>
      {[0, 1, 2].map((item, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentPage ? '#00958C' : '#D9D9D9',
            },
          ]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    margin: 3,
  },
});
