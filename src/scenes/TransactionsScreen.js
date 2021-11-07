import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useTheme} from '_theme/ThemeContext';
import TransactionsList from '_components/molecules/TransactionsList';

const TransactionsScreen = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <TransactionsList />
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

export default TransactionsScreen;
