import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@app/resources';

export default styles = StyleSheet.create({
  searchViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeStyle: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  loader: {
    flex: 1,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer: {
    backgroundColor: '#F6F6F6',
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_279,
    borderRadius: 10,
    // alignSelf:'center',
    // justifyContent:'center',
    marginTop: SPACING.SCALE_20,
    marginLeft: SPACING.SCALE_16,
    //marginBottom: 100,
  },
  inner: {
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_160,
    borderRadius: 10,
    // position:'absolute'
  },
  imageStyle: {
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_160,
    borderRadius: 10,
    // marginTop: -8,
    //marginTop: -15,
  },
  progressContainer: {
    marginLeft: 18,
    marginTop: 20,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.APPGREEN,
  },
  filterStyle: {
    backgroundColor: 'white',
  },
  filterSortSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterContainer: {
    //borderWidth: 1,
    marginVertical: SPACING.SCALE_24,
    marginHorizontal: SPACING.SCALE_20,
    // backgroundColor: 'red',
  },
  switchButton: {
    height: SPACING.SCALE_44,
    width: SPACING.SCALE_167,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // styles for Sort view
  dotIndicatorStyle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00958C',
    marginRight: SPACING.SCALE_8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInsideIndicatorStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    //borderWidth: 1,
    backgroundColor: '#00958C',
    //marginRight: SPACING.SCALE_8,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  sortObjectStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: SPACING.SCALE_16,
    //marginLeft: SPACING.SCALE_10,
    //justifyContent: 'center',
  },
  sortView: {
    paddingTop: SPACING.SCALE_18,
    paddingLeft: SPACING.SCALE_18,
  },
  filterViewCategoryStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SPACING.SCALE_40,
  },
});
