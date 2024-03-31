/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import {SPACING} from '@app/resources';

const Chartdemo = () => {
  const {productChartLoading, productChartData, productChartError} =
    useSelector(state => state?.exploreReducer);
  console.log('==============>>>>', productChartData);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {productChartLoading ? (
        <View
          style={{
            height: 220,
            width: SPACING.SCALE_344,
            backgroundColor: '#F0F2FA',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={20} />
        </View>
      ) : productChartData?.data?.chart?.length === 0 ? (
        <View
          style={{
            height: 220,
            width: SPACING.SCALE_344,
            backgroundColor: '#F0F2FA',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No record found</Text>
        </View>
      ) : (
        <LineChart
          data={{
            labels: productChartData?.data?.chart?.label ?? [],
            datasets: [
              {
                data: productChartData?.data?.chart?.value ?? [],
              },
            ],
          }}
          width={SPACING.SCALE_344} // from react-native
          height={220}
          //yAxisLabel="$"
          //yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          //propsForVerticalLabels={}
          chartConfig={{
            //backgroundColor: '#F0F2FA',
            backgroundGradientFrom: '#F0F2FA',
            // backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#F0F2FA',
            // backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(1,149,140, ${opacity})`,
            strokeWidth: 1.5, // optional, default 3
            //barPercentage: 0.5,
            //useShadowColorFromDataset: false, // optional
            // propsForDots: {
            //   //  r: '6',
            //   //strokeWidth: '0',
            //   //stroke: '#ffa726',
            // },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default Chartdemo;
