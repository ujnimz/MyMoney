import React, {useEffect} from 'react';
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
import {getMonthName} from '_utils/useDateTime';
import LoadingIcon from '_components/atoms/LoadingIcon';
import Message from '_components/atoms/Message';
import TransactionsList from '_components/molecules/TransactionsList';
// REDUX
import {connect} from 'react-redux';
import {getTransactionsByDate} from '_redux/actions/transactions';
import {
  getCurrentTime,
  getNextTime,
  getPreviousTime,
} from '_redux/actions/time';

const TransactionsScreen = ({
  getTransactionsByDate,
  getCurrentTime,
  getNextTime,
  getPreviousTime,
  transactionsState,
  timeState,
}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading, transactionData} = transactionsState;
  const {time, count} = timeState;

  // get current month's transactions
  useEffect(() => {
    if (time) {
      getTransactionsByDate(time.curMonthIndex, time.curYear);
    }
  }, [time]);

  // change month index and year to next month
  const onNextMonth = () => {
    getNextTime(time.curMonthIndex, time.curYear);
  };

  // change month index and year to previous month
  const onPrevMonth = () => {
    getPreviousTime(time.curMonthIndex, time.curYear);
  };

  // change month index and year to current month and year
  const onCurrMonthYear = () => {
    getCurrentTime();
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
          <Text style={styles.title}>{`${getMonthName(time.curMonthIndex)} ${
            time.curYear
          }`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNextMonth()} disabled={count === 0}>
          <Ionicons
            name='chevron-forward-circle-outline'
            color={colors.text.main}
            size={36}
            style={count === 0 ? {opacity: 0.4} : ''}
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
  timeState: PropTypes.object.isRequired,
  getTransactionsByDate: PropTypes.func.isRequired,
  getCurrentTime: PropTypes.func.isRequired,
  getNextTime: PropTypes.func.isRequired,
  getPreviousTime: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  transactionsState: state.transactionsState,
  timeState: state.timeState,
});

export default connect(mapStateToProps, {
  getTransactionsByDate,
  getCurrentTime,
  getNextTime,
  getPreviousTime,
})(TransactionsScreen);
