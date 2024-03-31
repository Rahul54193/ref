import { CustomText } from '@app/components';
import { SPACING } from '@app/resources';
import { Pressable, StyleSheet, View } from 'react-native';

const LinkNavigationRow = ({ title, linkTitle, onPress }) => {
  return (
    <View style={styles.rowContainer}>
      <CustomText style={styles.title}>{title}</CustomText>
      <Pressable onPress={onPress}>
        <CustomText style={styles.linkTitle}>{linkTitle}</CustomText>
      </Pressable>
    </View>
  );
};

export default LinkNavigationRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkTitle: { color: '#00958C', marginLeft: 5, fontFamily: 'OpenSans-SemiBold', fontSize: SPACING.SCALE_12 },
  title: { color: '#4E4E4E', fontFamily: 'OpenSans-Regular', fontSize: SPACING.SCALE_13 },
});
