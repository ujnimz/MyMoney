import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Keyboard} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import FormButton from '_components/atoms/FormButton';
import FormTextInput from '_components/atoms/FormTextInput';
import FormCategorySelect from '_components/atoms/FormCategorySelect';
import FormDateSelect from '_components/atoms/FormDateSelect';

// REDUX
import {connect} from 'react-redux';
import {addTransaction, rollbackCompleted} from '_redux/actions/transactions';

const AddTransactionScreen = ({
  navigation,
  route,
  addTransaction,
  rollbackCompleted,
  transactionsState,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState(undefined);
  const [date, setDate] = useState(undefined);

  const {isLoading, isCompleted} = transactionsState;

  useEffect(() => {
    if (isCompleted) {
      navigation.navigate('AppNavTabs'); // if comes from Category screen, go back
    }
    return () => {
      rollbackCompleted();
    };
  }, [isCompleted]);

  useEffect(() => {
    if (route.params?.cat) {
      setCategory(route.params.cat);
    }
    return () => {
      setCategory(undefined);
    };
  }, [route.params?.cat]);

  const handleCategorySelect = () => {
    Keyboard.dismiss();
    return navigation.navigate('SelectCategory', {
      select: true,
    }); // go to Category screen to select a category
  };

  //Convert the amount to number format before store in database
  const convertToNumber = amount => {
    return Number(amount.replace(/[^0-9.-]+/g, ''));
  };

  // Add Data to Firebase
  const onAdd = async () => {
    return await addTransaction({
      amount: amount === '' ? '' : convertToNumber(amount),
      notes,
      category,
      date,
      month: date ? date.getMonth() : '',
      year: date ? date.getFullYear() : '',
    });
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
      <FormCategorySelect
        handleCategorySelect={handleCategorySelect}
        category={category}
        placeholder='Select Category'
      />
      <FormDateSelect setDate={setDate} date={date} placeholder='Select Date' />

      <FormButton
        text='Add Transaction'
        bgColor={colors.primary.main}
        textColor={colors.primary.content}
        isAnimating={isLoading}
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

AddTransactionScreen.propTypes = {
  transactionsState: PropTypes.object.isRequired,
  addTransaction: PropTypes.func.isRequired,
  rollbackCompleted: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  transactionsState: state.transactionsState,
});

export default connect(mapStateToProps, {addTransaction, rollbackCompleted})(
  AddTransactionScreen,
);
