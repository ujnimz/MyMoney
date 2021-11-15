import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '_theme/ThemeContext';
import {
  getMonthName,
  getThisYear,
  getThisMonthIndex,
  getNextMonthYear,
  getPrevMonthYear,
} from '_utils/useDateTime';
import {StyleSheet, View} from 'react-native';
import GradientBackground from '_theme/GradientBackground';
import Summary from '_components/organisms/Summary';
import Header from '_components/organisms/Header';
import TransactionsModal from '_components/modals/TransactionsModal';

// REDUX
import {connect} from 'react-redux';
import {authStatus} from '_redux/actions/auth';
import {getTransactionsByDate} from '_redux/actions/transactions';

const HomeScreen = ({navigation, getTransactionsByDate, transactionsState}) => {
  const {colors} = useTheme();
  const styles = useStyles();

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
          title={getTitle()}
          disabled={disable}
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
  navigation: PropTypes.object.isRequired,
  authStatus: PropTypes.func.isRequired,
  getTransactionsByDate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  transactionsState: state.transactionsState,
});

export default connect(mapStateToProps, {authStatus, getTransactionsByDate})(
  HomeScreen,
);
