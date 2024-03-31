import {useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';

import {CustomText, KeyboardAwareView} from '@app/components';
import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';

const ActionContainer = ({
  onSendMessageClick,
  onAttachmentClick,
  onMakeOfferClick,
  exploreProduct,
  authReducer,
  onInterestClick,
}) => {
  const isKeyboardVisible = useKeyboardVisible();
  const [message, setMessage] = useState('');
  const isSeller =
    exploreProduct?.productDetails?.user?.id ===
    authReducer.userProfileDetails.id;
  console.log('isSeller', isSeller);

  return (
    <>
      {isKeyboardVisible ? null : (
        <View style={styles.offer_row}>
          <Pressable
            onPress={isSeller ? onInterestClick : onMakeOfferClick}
            style={styles.dollor_container}>
            <CustomIcon
              name={isSeller ? 'favorite' : 'attach-money'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              size={30}
              color={'#ffffff'}
            />
          </Pressable>
          <View style={styles.offer_container}>
            <View style={styles.offer_text}>
              <CustomText>
                {isSeller ? 'Add interest list' : 'Made an offer'}
              </CustomText>
            </View>
            <View style={styles.triangle} />
          </View>
        </View>
      )}
      <View style={styles.rowContainer}>
        <Pressable style={styles.image} onPress={onAttachmentClick}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'image'}
            color={'black'}
            size={30}
          />
        </Pressable>
        <TextInput
          style={styles.input_container}
          outlineColor="grey"
          value={message}
          onChangeText={v => {
            setMessage(v);
          }}
          placeholder={'Start typing here...'}
        />
        <Pressable
          style={styles.sendButton}
          onPress={
            message.length
              ? () => {
                  onSendMessageClick({message});
                  setMessage('');
                }
              : null
          }>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'send'}
            color={'black'}
            size={30}
          />
        </Pressable>
      </View>
    </>
  );
};
export default ActionContainer;

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  offer_row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    // paddingTop: 10,
  },
  dollor_container: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#00958C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offer_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offer_text: {
    height: 30,
    backgroundColor: '#E7E7E7BD',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderTopWidth: 15,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E7E7E7BD',
    transform: [{rotate: '90deg'}],
  },
  image: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_container: {
    borderWidth: 1,
    borderRadius: 15,
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
});
