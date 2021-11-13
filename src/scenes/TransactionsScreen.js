import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import LoadingIcon from '_components/atoms/LoadingIcon';
import TransactionsList from '_components/molecules/TransactionsList';
// REDUX
import {connect} from 'react-redux';
import {getTransactions} from '_redux/actions/transactions';

const TransactionsScreen = ({getTransactions, transactionsState}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const {isLoading, transactionData} = transactionsState;

  useEffect(() => {
    console.log(1111);
    getTransactions();
  }, []);

  //console.log(transactionsState);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading || !transactionData ? (
        <LoadingIcon />
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
  });

TransactionsScreen.propTypes = {
  transactionsState: PropTypes.object.isRequired,
  getTransactions: PropTypes.func.isRequired,
  //rollbackCompleted: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  transactionsState: state.transactionsState,
});

export default connect(mapStateToProps, {getTransactions})(TransactionsScreen);
