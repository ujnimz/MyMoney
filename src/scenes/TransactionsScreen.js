import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '_theme/ThemeContext';
import {
  getMonthName,
  getThisYear,
  getThisMonthIndex,
  getNextMonthYear,
  getPrevMonthYear,
} from '_utils/useDateTime';
import LoadingIcon from '_components/atoms/LoadingIcon';
import Message from '_components/atoms/Message';
import TransactionsList from '_components/molecules/TransactionsList';
// REDUX
import {connect} from 'react-redux';
import {getTransactionsByDate} from '_redux/actions/transactions';

const TransactionsScreen = ({getTransactionsByDate, transactionsState}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading, transactionData} = transactionsState;

  const [monthIndex, setMonthIndex] = useState(getThisMonthIndex());
  const [year, setYear] = useState(getThisYear());
  const [disable, setDisable] = useState(true);

  // get current month's transactions
  useEffect(() => {
    getTransactionsByDate(monthIndex, year);
    // set next button disabled if this is the current month and year
    monthIndex === getThisMonthIndex() && year === getThisYear()
      ? setDisable(true)
      : setDisable(false);
  }, [monthIndex]);

  // change month index and year to next month
  const onNextMonth = () => {
    const next = getNextMonthYear(monthIndex, year);
    setMonthIndex(next.monthIndex);
    setYear(next.year);
  };

  // change month index and year to previous month
  const onPrevMonth = () => {
    const prev = getPrevMonthYear(monthIndex, year);
    setMonthIndex(prev.monthIndex);
    setYear(prev.year);
  };

  // change month index and year to current month and year
  const onCurrMonthYear = () => {
    setMonthIndex(getThisMonthIndex());
    setYear(getThisYear());
  };

  // return month and year title
  const getTitle = () => {
    return `${getMonthName(monthIndex)} ${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onPrevMonth()}>
          <Ionicons
            name='chevron-back-circle-outline'
            color={colors.text.main}
            size={36}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onCurrMonthYear()}>
          <Text style={styles.title}>{getTitle()}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNextMonth()} disabled={disable}>
          <Ionicons
            name='chevron-forward-circle-outline'
            color={colors.text.main}
            size={36}
            style={disable ? {opacity: 0.4} : ''}
          />
        </TouchableOpacity>
      </View>

      {isLoading || !transactionData ? (
        <LoadingIcon />
      ) : transactionData.length < 1 ? (
        <Message message='No transactions found. Please add.' />
      ) : (
        <TransactionsList transactionData={transactionData} />
      )}
    </SafeAreaView>
  );
};

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.background.main,
      padding: 15,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.main,
      marginBottom: 15,
    },
  });

TransactionsScreen.propTypes = {
  transactionsState: PropTypes.object.isRequired,
  getTransactionsByDate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  transactionsState: state.transactionsState,
});

export default connect(mapStateToProps, {
  getTransactionsByDate,
})(TransactionsScreen);
