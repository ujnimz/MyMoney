import React from 'react';
import {StyleSheet} from 'react-native';
import Dialog from 'react-native-dialog';
import {useTheme} from '_theme/ThemeContext';

const AlertPopup = ({
  visible,
  title,
  message,
  handleCancel,
  handleOk,
  cancelLabel = 'Cancel',
  okLabel = 'OK',
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{message}</Dialog.Description>
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

export default AlertPopup;
