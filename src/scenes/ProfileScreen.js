import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import TextButton from '_components/atoms/TextButton';
import FormTextInput from '_components/atoms/FormTextInput';
import TextSelect from '_components/atoms/TextSelect';
import AddCurrencyModal from '_components/modals/AddCurrencyModal';

const ProfileScreen = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const modalizeRef = useRef(null);

  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.form}>
          <FormTextInput
            value={name}
            onChangeText={val => setName(val)}
            name='name'
            placeholder='Name'
            textContentType='name'
            autoFocus={true}
          />
          <TextSelect
            modalizeRef={modalizeRef}
            onChangeText={val => setCurrency(val)}
            name='currency'
            value={currency}
            placeholder='Select Currency'
          />

          <TextButton
            text='Update'
            bgColor={colors.primary.main}
            textColor={colors.primary.content}
            onPress={() => setName()}
          />

          <AddCurrencyModal
            modalizeRef={modalizeRef}
            currency={currency}
            setCurrency={setCurrency}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.background.main,
    },
    text: {
      fontSize: 14,
    },
    form: {
      flex: 1,
      paddingTop: 30,
    },
  });

export default ProfileScreen;
