import {COLORS, SPACING} from '@app/resources';
import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  imageStyle: {
    height: SPACING.SCALE_123,
    width: SPACING.SCALE_123,
    borderRadius: SPACING.SCALE_5,
    // marginLeft: SPACING.SCALE_20,
    marginTop: SPACING.SCALE_20,
    marginBottom: SPACING.SCALE_20,
  },
  imageContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.SCALE__25,
  },
  modelContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.SCALE_10,
    justifyContent: 'space-around',
  },
  keyDifferences: {
    paddingHorizontal: SPACING.SCALE_30,
  },
  modalTextColor: {
    fontWeight: '400',
    color: COLORS.modalViewTextColor,
  },
});
