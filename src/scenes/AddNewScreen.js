import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import FormButton from '_components/atoms/FormButton';
import FormTextInput from '_components/atoms/FormTextInput';

const AddNewScreen = ({navigation}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const modalizeRef = useRef(null);

  useEffect(() => {
    modalizeRef.current?.open();
    return () => {
      modalizeRef.current?.close();
    };
  }, []);

  const onAdd = () => {
    return;
  };

  return (
    <View style={styles.container}>
      <FormTextInput
        value={amount}
        onChangeText={val => setAmount(val)}
        name='amount'
        placeholder='Amount'
        autoFocus={true}
        keyboardType='numeric'
      />
      <FormTextInput
        value={notes}
        onChangeText={val => setNotes(val)}
        name='notes'
        placeholder='Notes'
      />
      <Button
        onPress={() => navigation.navigate('CategoryList')}
        title='Dismiss'
      />
      <FormButton
        text='Add Transaction'
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        //isAnimating={isLoading}
        onPress={() => onAdd()}
      />
    </View>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.background.main,
      paddingTop: 15,
    },
    text: {
      fontSize: 14,
    },
  });

export default AddNewScreen;
