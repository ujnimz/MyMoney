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
import {getMonth, getYear, getThisMonthIndex} from '_utils/useDateTime';
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

  useEffect(() => {
    getTransactionsByDate(monthIndex, getYear());
  }, [monthIndex]);

  const nextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };
  const prevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => prevMonth()}>
          <Ionicons
            name='chevron-back-circle-outline'
            color={colors.text.main}
            size={36}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMonthIndex(getThisMonthIndex())}>
          <Text style={styles.title}>{getMonth(monthIndex)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => nextMonth()}>
          <Ionicons
            name='chevron-forward-circle-outline'
            color={colors.text.main}
            size={36}
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
