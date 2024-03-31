import {StyleSheet, Text, Keyboard, View} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import CustomIcon, {ICON_TYPE} from './CustomIcon';

const CustomInput = forwardRef(
  (
    {
      label,
      mode = 'flat',
      placeholder = 'Enter your text',
      multiline = false,
      editable = true,
      value,
      onChangeText,
      error = false,
      secureTextEntry,
      lableStyle,
      style,
      errorText = '',
      rightIcon,
      leftIcon,
      keyboardType,
      leftIconAffix,
      onSubmitEditing,
      CurrencyIcon,
      ...rest
    },
    ref,
  ) => {
    const [showPass, setShowPass] = useState(false);
    const styles = useStyles(multiline);
    return (
      <>
        {CurrencyIcon ? (
          <>
            {label ? <Text style={[lableStyle]}>{label}</Text> : null}
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, alignSelf: 'center'}}>
                {CurrencyIcon}
              </Text>
              <TextInput
                onSubmitEditing={onSubmitEditing}
                scrollEnabled={false}
                autoCapitalize="none"
                ref={ref}
                secureTextEntry={secureTextEntry && !showPass}
                style={[styles.containerStyle, style]}
                contentStyle={{paddingHorizontal: 0}}
                mode={mode}
                label={''}
                placeholder={placeholder}
                value={value}
                error={error}
                onChangeText={onChangeText}
                editable={editable}
                multiline={multiline}
                numberOfLines={multiline ? 5 : 1}
                keyboardType={keyboardType}
                activeOutlineColor="#000000"
                activeUnderlineColor="#000000"
                // theme={styles.textInputOutlineStyle}
                left={
                  leftIconAffix ? (
                    leftIconAffix
                  ) : leftIcon ? (
                    <TextInput.Icon
                      forceTextInputFocus={false}
                      icon={() => leftIcon}
                      size={20}
                    />
                  ) : null
                }
                right={
                  secureTextEntry ? (
                    <TextInput.Icon
                      forceTextInputFocus={false}
                      icon={() => (
                        <CustomIcon
                          origin={ICON_TYPE.FEATHER_ICONS}
                          name={showPass ? 'eye' : 'eye-off'}
                          color={'black'}
                          size={20}
                        />
                      )}
                      onPress={() => {
                        Keyboard.dismiss();
                        setShowPass(!showPass);
                      }}
                    />
                  ) : null
                }
                {...rest}
              />
            </View>
            <HelperText type="error" visible={error}>
              {errorText}
            </HelperText>
          </>
        ) : (
          <>
            {label ? <Text style={[lableStyle]}>{label}</Text> : null}
            <TextInput
              onSubmitEditing={onSubmitEditing}
              scrollEnabled={false}
              autoCapitalize="none"
              ref={ref}
              secureTextEntry={secureTextEntry && !showPass}
              style={[styles.containerStyle, style]}
              contentStyle={{paddingHorizontal: 0}}
              mode={mode}
              label={''}
              placeholder={placeholder}
              value={value}
              error={error}
              onChangeText={onChangeText}
              editable={editable}
              multiline={multiline}
              activeOutlineColor="#000000"
              activeUnderlineColor="#000000"
              numberOfLines={multiline ? 5 : 1}
              keyboardType={keyboardType}
              // theme={styles.textInputOutlineStyle}
              left={
                leftIconAffix ? (
                  leftIconAffix
                ) : leftIcon ? (
                  <TextInput.Icon
                    forceTextInputFocus={false}
                    icon={() => leftIcon}
                    size={20}
                  />
                ) : null
              }
              right={
                secureTextEntry ? (
                  <TextInput.Icon
                    forceTextInputFocus={false}
                    icon={() => (
                      <CustomIcon
                        origin={ICON_TYPE.FEATHER_ICONS}
                        name={showPass ? 'eye' : 'eye-off'}
                        color={'black'}
                        size={20}
                      />
                    )}
                    onPress={() => {
                      Keyboard.dismiss();
                      setShowPass(!showPass);
                    }}
                  />
                ) : null
              }
              {...rest}
            />
            <HelperText type="error" visible={error}>
              {errorText}
            </HelperText>
          </>
        )}
      </>
    );
  },
);

export default CustomInput;

const useStyles = multiline =>
  StyleSheet.create({
    // textInputOutlineStyle: {
    //   width: '70%',
    //   colors: {
    //     placeholder: 'black',
    //     text: 'black',
    //     background: 'blue',
    //     // primary: 'black',
    //     underlineColor: 'transparent',
    //   },
    //   roundness: 10,
    // },
    containerStyle: {
      backgroundColor: 'white',
      // height: multiline ? null : 40,
      paddingHorizontal: 0,
      textAlignVertical: multiline ? 'top' : 'center',
      // fontSize: 14,
    },
  });
