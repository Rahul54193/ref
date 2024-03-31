import {CustomIcon, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {Pressable, StyleSheet, View} from 'react-native';
import LinkNavigationRow from './LinkNavigationRow';

const TermsConditionRow = ({isChecked, setIsChecked, onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        <CustomIcon
          origin={ICON_TYPE.MATERIAL_ICONS}
          name={isChecked ? 'check-box' : 'check-box-outline-blank'}
          size={25}
          color={isChecked ? '#00958C' : '#4E4E4E'}
        />
      </Pressable>
      <Spacer width={10} />
      <LinkNavigationRow
        title={'I agree to the'}
        linkTitle={'Terms and conditions'}
        onPress={onPress}
      />
    </View>
  );
};

export default TermsConditionRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
