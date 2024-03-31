import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '../resources';

const DatePicker = ({
  marginTop,
  onChangeDate,
  label,
  maximumDate,
  borderColor,
  borderWidth,
  minimumDate,
  dropDownValue,
  isDisableEndDT,
  Value,
  mainStyle,
  dropDownValueStyle,
  children,
  mainBackground,
}) => {
  const [show, setShow] = useState(false);
  const [iosData, setIosDate] = useState(Value ?? new Date());
  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <TouchableOpacity onPress={showDatepicker} style={[styles.mainView]}>
        {children}
      </TouchableOpacity>

      {show && Platform.OS === 'ios' && (
        <Modal
          visible={show}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}
          onRequestClose={() => {
            setShow(false);
          }}>
          <View style={{flex: 1, backgroundColor: '#0000004d'}} />
          <View style={{backgroundColor: 'white', width: '100%'}}>
            <View style={styles.iosBtn}>
              <Text style={styles.iosActionBtn} onPress={() => setShow(false)}>
                {' '}
                CANCEL{' '}
              </Text>
              <Text
                style={styles.iosActionBtn}
                onPress={() => {
                  onChangeDate(iosData);
                  setShow(false);
                }}>
                {' '}
                DONE {'  '}
              </Text>
            </View>
            <DateTimePicker
              textColor={COLORS.BLACK}
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={Value ?? iosData}
              is24Hour={false}
              display={'spinner'}
              onChange={(event, value) => {
                setIosDate(value);
              }}
              // maximumDate={maximumDate ?? new Date()}
              minimumDate={minimumDate ?? new Date()}
            />
          </View>
        </Modal>
      )}

      {show && Platform.OS !== 'ios' && (
        <DateTimePicker
          testID="dateTimePicker"
          value={Value ?? new Date()}
          is24Hour={false}
          display="default"
          themeVariant="dark"
          onChange={(event, value) => {
            if (event.type === 'dismissed') {
              setShow(false);
            } else {
              setShow(false);
              onChangeDate(value);
            }
          }}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // marginTop: SPACING.SCALE_7,
    borderRadius: SPACING.SCALE_10,
    paddingHorizontal: SPACING.SCALE_10,
    backgroundColor: 'white',
  },
  textLabel: {
    fontSize: TYPOGRAPHY.FONT_SIZE_14,
    color: '#01ACED',
    fontFamily: 'Open Sans',
    marginTop: SPACING.SCALE_6,
  },
  mainView: {
    flexDirection: 'row',
  },
  dropDownValueView: {
    flex: 1,
    height: SPACING.SCALE_44,
    justifyContent: 'center',
  },
  dropDownValue: {
    fontFamily: 'Open Sans',
    fontSize: TYPOGRAPHY.FONT_SIZE_12,
    lineHeight: SPACING.SCALE_20,
    fontWeight: '500',
    color: COLORS.GRAY_DARK,
    // marginTop: 10,
    marginLeft: 5,
  },

  imageStyle: {
    paddingHorizontal: 20,
    tintColor: COLORS.WHITE,
    height: SPACING.SCALE_19,
    width: SPACING.SCALE_19,
    alignSelf: 'center',
  },
  iosBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 1,
  },
  iosActionBtn: {
    marginLeft: 20,
    fontFamily: 'Open Sans',
    fontSize: 16,
    color: '#01ACED',
  },
});

export default DatePicker;
