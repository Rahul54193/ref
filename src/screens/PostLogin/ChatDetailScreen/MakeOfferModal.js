import {FontsConst} from '@app/assets/assets';
import {
  CustomText,
  KeyboardAwareView,
  Spacer,
  SubmitButton,
} from '@app/components';
import {FormattedNumber, showAlert} from '@app/helper/commonFunction';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import {COLORS, SPACING} from '@app/resources';
import {useState} from 'react';
import {Text} from 'react-native';
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {Card} from 'react-native-paper';

const MakeOfferModal = ({modalVisible, setModalVisible, sendMessage}) => {
  const [amount, setAmount] = useState(null);
  const keyboardVisible = useKeyboardVisible();

  const onOfferClick = () => {
    if (!amount) {
      return;
    } else if (amount <= 0) {
      return;
    } else {
      setModalVisible(false);
      showAlert({
        title: 'Made an offer',
        message: `S$ ${amount}`,
        actions: [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              const numericValue = 'S$ ' + amount?.replace(/[^0-9.]/g, '');
              // sendMessage({message: 'I have make an offer.', type: 'text'});
              sendMessage({message: numericValue, type: 'make_offer'});
            },
          },
        ],
      });
      setAmount('');
    }
  };

  const onChangeText = v => {
    const numericValue = v.replace(/[^0-9.]/g, '');
    // Format the numeric value with commas every three digits
    const formattedNumber = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // console.log(price, "Price Value ====================>>>>>>>>>>>>>>")
    // const formattedNumber = FormattedNumber(v)
    if (v.length <= 12) {
      setAmount(formattedNumber);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <KeyboardAwareView style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={() =>
            keyboardVisible
              ? Keyboard.dismiss()
              : setModalVisible(!modalVisible)
          }
        />
        <Card style={styles.card_container} onPress={() => Keyboard.dismiss()}>
          <View style={styles.border} />
          <View style={styles.grouped}>
            <CustomText style={styles.offer_text}>Offer Price</CustomText>
            {/* <TextInput
              keyboardType="numeric"
              mode="flat"
              underlineStyle={styles.input_underline}
              style={{
                alignSelf: 'center',
              }}
              contentStyle={styles.input_content}
              value={amount}
              onChangeText={onChangeText}
            /> */}
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: 20,
                  fontFamily: 'OpenSans-SemiBold',
                }}>
                S$
              </Text>

              <TextInput
                keyboardType="numeric"
                style={{
                  alignSelf: 'center',
                  minWidth: SPACING.SCALE_150,
                  // width: 200,
                  //height: 40,
                  //  borderWidth: 1,
                  //borderColor: 'gray',
                  //borderRadius: 5,
                  // padding: 10,
                  //color: COLORS.APPGREEN,
                  //borderColor: 'transparent',
                  fontSize: 40,
                  borderBottomWidth: 2,
                  borderColor: COLORS.APPGREEN,
                  textAlign: 'center',
                }}
                value={amount}
                onChangeText={onChangeText}
                //placeholder="Type here..."
              />
            </View>

            <Spacer height={30} />
            <SubmitButton lable="Send" onPress={onOfferClick} />
          </View>
        </Card>
      </KeyboardAwareView>
    </Modal>
  );
};

export default MakeOfferModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: '#00000040',
  },
  backdrop: {
    height: '60%',
  },
  card_container: {
    height: '40%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
  },
  border: {
    width: 60,
    height: 3,
    backgroundColor: '#B1B1B1',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  offer_text: {
    color: '#00958C',
    fontFamily: FontsConst.OpenSans_SemiBold,
    alignSelf: 'center',
    fontSize: 16,
  },
  grouped: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    //width: '100%',
  },
  input_content: {
    minWidth: 150,
    fontSize: 30,
    backgroundColor: '#fff',
    fontFamily: FontsConst.OpenSans_SemiBold,
  },
  input_underline: {
    height: 2,
    backgroundColor: '#00958C',
  },
});
