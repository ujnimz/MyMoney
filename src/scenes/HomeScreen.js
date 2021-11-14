import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '_theme/ThemeContext';
import {getMonth, getYear, getThisMonthIndex} from '_utils/useDateTime';
import {StyleSheet, View} from 'react-native';
import GradientBackground from '_theme/GradientBackground';
import Summary from '_components/organisms/Summary';
import Header from '_components/organisms/Header';
import LoadingIcon from '_components/atoms/LoadingIcon';
import Message from '_components/atoms/Message';
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
    <GradientBackground
      gradientColors={[
        colors.gradient.start,
        colors.gradient.middle,
        colors.gradient.end,
      ]}
    >
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Summary />

        {isLoading || !transactionData ? (
          <LoadingIcon />
        ) : transactionData.length < 1 ? (
          <Message message='No transactions found. Please add.' />
        ) : (
          <TransactionsModal transactionData={transactionData} />
        )}
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
