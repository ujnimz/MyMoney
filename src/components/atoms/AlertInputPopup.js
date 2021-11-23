import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Dialog from 'react-native-dialog';
import {useTheme} from '_theme/ThemeContext';

const AlertInputPopup = ({
  visible,
  title,
  message,
  inputValue,
  setInputValue,
  isError,
  handleCancel,
  handleOk,
  cancelLabel = 'Cancel',
  okLabel = 'OK',
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const onChange = val => {
    setInputValue(val);
  };

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{message}</Dialog.Description>
      <Dialog.Input
        placeholder='Password'
        secureTextEntry
        onChangeText={val => onChange(val)}
        wrapperStyle={isError ? styles.input : {}}
      />
      <Dialog.Button label={cancelLabel} onPress={handleCancel} />
      <Dialog.Button label={okLabel} onPress={handleOk} />
    </Dialog.Container>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    input: {
      borderColor: colors.error,
    },
  });

export default AlertInputPopup;
