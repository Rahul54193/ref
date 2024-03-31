import {Spacer, SubmitButton} from '@app/components';
import {IMAGES} from '@app/resources';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import {Image, ScrollView, StyleSheet} from 'react-native';
import Pagination from './Pagination';

const Page1 = ({onPress}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{width: '80%'}}>
      <LoginHeader
        title={'Luxury Watches'}
        description={
          'Erat neque facilisi pharetra et habitant posuere. Id tortor nisl eu scelerisque tempor orci sit. Egestas mus sapien duis vel necpellentesque sit et convallis'
        }
      />
      <Spacer height={20} />
      <Image
        source={IMAGES.Rectangle1}
        style={{
          height: 342,
          width: 284,
          alignSelf: 'center',
          borderRadius: 10,
        }}
      />
      <Spacer height={30} />
      <Pagination currentPage={0} />
      <Spacer height={30} />
      <SubmitButton onPress={onPress} lable="Next" />
    </ScrollView>
  );
};

export default Page1;

const styles = StyleSheet.create({});
