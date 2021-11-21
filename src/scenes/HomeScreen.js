import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '_theme/ThemeContext';

import {StyleSheet, View} from 'react-native';
import GradientBackground from '_theme/GradientBackground';
import Summary from '_components/organisms/Summary';
import Header from '_components/organisms/Header';
import TransactionsModal from '_components/modals/TransactionsModal';

// REDUX
import {connect} from 'react-redux';
import {authStatus} from '_redux/actions/auth';
import {getTransactionsByDate} from '_redux/actions/transactions';
import {
  getCurrentTime,
  getNextTime,
  getPreviousTime,
} from '_redux/actions/time';

const HomeScreen = ({
  navigation,
  transactionsState,
  timeState,
  getTransactionsByDate,
  getCurrentTime,
  getNextTime,
  getPreviousTime,
}) => {
  const {colors} = useTheme();
  const styles = useStyles();

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
    <GradientBackground
      gradientColors={[
        colors.gradient.start,
        colors.gradient.middle,
        colors.gradient.end,
      ]}
    >
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Summary
          onNextMonth={onNextMonth}
          onCurrMonthYear={onCurrMonthYear}
          onPrevMonth={onPrevMonth}
          nextDisabled={count === 0}
          transactionData={transactionData}
        />

        <TransactionsModal
          isLoading={isLoading}
          transactionData={transactionData}
        />
      </View>
    </GradientBackground>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
  });

HomeScreen.propTypes = {
  transactionsState: PropTypes.object.isRequired,
  timeState: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  authStatus: PropTypes.func.isRequired,
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
  authStatus,
  getTransactionsByDate,
  getCurrentTime,
  getNextTime,
  getPreviousTime,
})(HomeScreen);
